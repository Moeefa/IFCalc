import type { NextApiRequest, NextApiResponse } from 'next';
import mongodb from "../../utils/libs/database";
import Users, { IUsers } from "../../utils/schemas/Users";
import axios from "axios";

type Data = {
  success: boolean;
  data?: IUsers | null;
  message?: string;
};

enum Type {
  Anual = "0",
  Bimestral = "1",
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (!req.query.token) return res.status(400).json({ success: false, message: "Missing token query" });

  const resp = await axios.get('https://suap.ifmt.edu.br/api/eu/', { timeout: 10_000, headers: { Authorization: "Bearer " + req.query.token } });
  let mat = await axios.get(`https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/${new Date().getFullYear()}/1/`, { timeout: 10_000, headers: { Authorization: "Bearer " + req.query.token } });
  mat = mat.data.filter(a => a.situacao !== "Transferido").reduce((a, b) => {
    return [ 
      ...a, 
      { 
        nome: b.disciplina.slice(b.disciplina.indexOf("-") + 1, b.disciplina.length).trim(), 
        notas: {
          0: Number(b.nota_etapa_1.nota),
          1: Number(b.nota_etapa_2.nota),
          2: Number(b.nota_etapa_3.nota),
          3: Number(b.nota_etapa_4.nota),
        },
      },
    ];
  }, []);

  await mongodb();
  let user = await Users.findOne({ _id: resp.data.identificacao });
  
  switch (req.method) {
    case "GET":
      if (!user) return res.json({ success: false, data: null });
      user.materias_anual = [ ...mat, ...user.materias_anual ];
      res.json({ success: true, data: user });
      break;
    case "PUT":
      if (!req.query.nome) return res.status(202).json({ success: false, data: user, message: "Missing name query" });
      if (!req.query.type) return res.status(202).json({ success: false, data: user, message: "Missing type query" });

      if (!user) {
        const u = new Users({
          _id: resp.data.identificacao,
          materias_anual: req.query.type === "0"
            ? [{
                nome: req.query.nome.toString(), 
                notas: { 
                  1: req.body.notas?.[1] ?? 0, 
                  2: req.body.notas?.[2] ?? 0, 
                  3: req.body.notas?.[3] ?? 0,
                  4: req.body.notas?.[4] ?? 0
                }
              }] : [],
          materias_bimestral: req.body.type === "1"
            ? [{
                nome: req.query.nome.toString(),
                bimestre: Number(req.query.bimestre),
                notas: { 
                  nota: req.body.notas?.nota ?? 0, 
                  conceito: req.body.notas?.conceito ?? 0
                }
              }] : []
        });
        await u.save();
        res.status(201).json({ success: true, data: u });
      } else {
        switch (req.query.type) {
          case Type.Anual:
            if (user.materias_anual.length >= 19) return res.status(400).json({ success: false, message: "Exceeded subjects limit" });
            if (user.materias_anual.some(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase().trim())) {
              user.materias_anual[user.materias_anual.findIndex(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase().trim())].notas = {
                1: req.body.notas?.[1] ?? 0, 
                2: req.body.notas?.[2] ?? 0, 
                3: req.body.notas?.[3] ?? 0,
                4: req.body.notas?.[4] ?? 0
              };
            } else {
              user.materias_anual.push({
                nome: req.query.nome.toString().trim(),
                notas: {
                  1: req.body.notas?.[1] ?? 0, 
                  2: req.body.notas?.[2] ?? 0, 
                  3: req.body.notas?.[3] ?? 0,
                  4: req.body.notas?.[4] ?? 0
                }
              });
            };
            user.markModified("materias_anual");
            break;
          case Type.Bimestral:
            if (user.materias_bimestral.length >= 19) return res.status(400).json({ success: false, message: "Exceeded subjects limit" });
            if (user.materias_bimestral.some(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase().trim() && Number(m.bimestre) === Number(req.query.bimestre))) {
              user.materias_bimestral[user.materias_bimestral.findIndex(m => m.nome === req.query.nome.toString().toLowerCase().trim() && m.bimestre === Number(req.query.bimestre))].notas = {
                nota: req.body.notas?.nota ?? 0, 
                conceito: req.body.notas?.conceito ?? 0
              };
            } else {
              user.materias_bimestral.push({
                nome: req.query.nome.toString().trim(),
                bimestre: Number(req.query.bimestre),
                notas: {
                  nota: req.body.notas?.nota ?? 0, 
                  conceito: req.body.notas?.conceito ?? 0
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
        case Type.Anual:
          if (user.materias_anual.some(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase())) {
            user.materias_anual.splice(user.materias_anual.findIndex(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase()), 1);
            user.markModified("materias_anual");
            await user.save();
            res.status(201).json({ success: true, data: user });
          } else {
            res.status(304).json({ success: false, data: user });
          } 
          break;
        case Type.Bimestral:
          if (user.materias_bimestral.some(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase() && m.bimestre === Number(req.query.bimestre))) {
            user.materias_bimestral.splice(user.materias_bimestral.findIndex(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase()), 1);
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
