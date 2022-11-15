import mongodb from "../../shared/libs/database";
import Users from "../../shared/models/User";
import axios from "axios";

export default async (req, res) => {
  if (!req.query.token) return res.status(400).json({ success: false, message: "Missing id query" });

  const resp = await axios.get('https://suap.ifmt.edu.br/api/eu/', { headers: { Authorization: "Bearer " + req.query.token } });
  
  await mongodb();
  let user = await Users.findOne({ _id: resp.data.identificacao });

  switch (req.method) {
    case "GET":
      if (!user) return res.json({ success: false, data: null });
      res.json({ success: true, data: user });
      break;
    case "PUT":
      if (!req.query.nome) return res.status(202).json({ success: false, data: user, message: "Missing name query" });
      if (!req.query.type) return res.status(202).json({ success: false, data: user, message: "Missing type query" });

      req.query.nome = req.query.nome.trim();
      if (!user) {
        const u = new Users({
          _id: resp.data.identificacao,
          materias_anual: req.query.type === "0"
            ? [{
                nome: req.query.nome, 
                notas: { 
                  1: (req.body.notas && req.body.notas[1]) ? req.body.notas[1] : 0, 
                  2: (req.body.notas && req.body.notas[2]) ? req.body.notas[2] : 0, 
                  3: (req.body.notas && req.body.notas[3]) ? req.body.notas[3] : 0,
                  4: (req.body.notas && req.body.notas[4]) ? req.body.notas[4] : 0
                }
              }] : [],
          materias_bimestral: req.body.type === "1"
            ? [{
                nome: req.query.nome,
                bimestre: req.query.bimestre,
                notas: { 
                  nota: req.body?.notas?.nota || 0, 
                  conceito: req.body?.notas?.conceito || 0
                }
              }] : []
        });
        await u.save();
        res.status(201).json({ success: true, data: u });
      } else {
        switch (req.query.type) {
          case "0":
            if (user.materias_anual.length >= 19) return res.status(400).json({ success: false, message: "Exceeded subjects limit" });
            if (user.materias_anual.some(m => m.nome.toLowerCase() === req.query.nome.toLowerCase())) {
              user.materias_anual[user.materias_anual.findIndex(m => m.nome.toLowerCase() === req.query.nome.toLowerCase())].notas = {
                1: (req.body.notas && req.body.notas[1]) ? req.body.notas[1] : 0, 
                2: (req.body.notas && req.body.notas[2]) ? req.body.notas[2] : 0, 
                3: (req.body.notas && req.body.notas[3]) ? req.body.notas[3] : 0,
                4: (req.body.notas && req.body.notas[4]) ? req.body.notas[4] : 0
              };
            } else {
              user.materias_anual.push({
                nome: req.query.nome,
                notas: {
                  1: (req.body.notas && req.body.notas[1]) ? req.body.notas[1] : 0, 
                  2: (req.body.notas && req.body.notas[2]) ? req.body.notas[2] : 0, 
                  3: (req.body.notas && req.body.notas[3]) ? req.body.notas[3] : 0,
                  4: (req.body.notas && req.body.notas[4]) ? req.body.notas[4] : 0
                }
              });
            };
            user.markModified("materias_anual");
            break;
          case "1":
            if (user.materias_bimestral.length >= 19) return res.status(400).json({ success: false, message: "Exceeded subjects limit" });
            if (user.materias_bimestral.some(m => m.nome.toLowerCase() === req.query.nome.toLowerCase() && Number(m.bimestre) === Number(req.query.bimestre))) {
              user.materias_bimestral[user.materias_bimestral.findIndex(m => m.nome === req.query.nome && m.bimestre === req.query.bimestre)].notas = {
                nota: req.body?.notas?.nota || 0, 
                conceito: req.body?.notas?.conceito || 0
              };
            } else {
              user.materias_bimestral.push({
                nome: req.query.nome,
                bimestre: req.query.bimestre,
                notas: {
                  nota: req.body?.notas.nota || 0, 
                  conceito: req.body?.notas.conceito || 0
                }
              });
            };
            user.markModified("materias_bimestral");
            break;
        };
        await user.save();
        res.status(201).json({ success: true, data: user });
      };
      break;
    case "DELETE":
      if (!user) return res.json({ success: false, data: null });
      if (!req.query.nome) return res.status(202).json({ success: false, data: user, message: "Missing name query" });
      if (!req.query.type) return res.status(202).json({ success: false, data: user, message: "Missing type query" });

      switch (req.query.type) {
        case "0":
          if (user.materias_anual.some(m => m.nome.toLowerCase() === req.query.nome.toLowerCase())) {
            user.materias_anual.splice(user.materias_anual.findIndex(m => m.nome.toLowerCase() === req.query.nome.toLowerCase()), 1);
            user.markModified("materias_anual");
            await user.save();
            res.status(201).json({ success: true, data: user });
          } else {
            res.status(304).json({ success: false, data: user });
          } 
          break;
        case "1":
          if (user.materias_bimestral.some(m => m.nome.toLowerCase() === req.query.nome.toLowerCase() && Number(m.bimestre) === Number(req.query.bimestre))) {
            user.materias_bimestral.splice(user.materias_bimestral.findIndex(m => m.nome.toLowerCase() === req.query.nome.toLowerCase()), 1);
            user.markModified("materias_bimestral");
            await user.save();
            res.status(201).json({ success: true, data: user });
          } else {
            res.status(304).json({ success: false, data: user });
          }
          break;
      }
      break;
    default:
      res.status(405).json({ success: false });
      break;
  }
}
