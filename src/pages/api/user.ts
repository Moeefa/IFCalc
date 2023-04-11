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
  ANUAL = "0",
  BIMESTRAL = "1",
}

function removeRedundance(a: IUsers['materias_anual'], b: IUsers['materias_anual']) {
  return Array.from(
    [...a, ...b]
      .reduce((acc, item) => acc.set(item.nome, item), new Map())
      .values());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token, nome, type, bimestre } = req.query;

  if (!token) return res.status(400).json({ success: false, message: "Missing token query" });

  const [resp, mat] = await Promise.all([
    axios.get(`https://suap.ifmt.edu.br/api/eu/`, { timeout: 10_000, headers: { Authorization: "Bearer " + token } }),
    axios.get(`https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/${new Date().getFullYear()}/1/`, { timeout: 10_000, headers: { Authorization: "Bearer " + token } })
  ]);

  mat.data = mat.data.filter(a => a.situacao !== "Transferido").reduce((a, b) => {
    return [ 
      ...a, 
      { 
        suap: true,
        nome: b.disciplina.slice(b.disciplina.indexOf("-") + 1, b.disciplina.length).replace(/(III|II)/g, "").trim(), 
        notas: {
          1: Number(b.nota_etapa_1.nota?.replace(",", ".")),
          2: Number(b.nota_etapa_2.nota?.replace(",", ".")),
          3: Number(b.nota_etapa_3.nota?.replace(",", ".")),
          4: Number(b.nota_etapa_4.nota?.replace(",", ".")),
        },
      },
    ];
  }, []);
  
  await mongodb();
  let user = await Users.findOne({ _id: resp.data.identificacao });
  
  switch (req.method) {
    case "GET":
      if (!user) return res.json({ 
        success: false, 
        data: {
          _id: resp.data.identificacao, 
          materias_anual: mat?.data || [], 
          materias_bimestral: [] 
        } 
      });

      user.materias_anual = removeRedundance(mat.data, user.materias_anual);
      res.json({ success: true, data: user });
      break;
    case "PUT":
      if (!nome) return res.status(202).json({ success: false, data: user, message: "Missing name query" });
      if (!type) return res.status(202).json({ success: false, data: user, message: "Missing type query" });

      if (!user) {
        const u = new Users({
          _id: resp.data.identificacao,
          materias_anual: type === Type.ANUAL
            ? [{
                nome: nome.toString(), 
                notas: { 
                  1: req.body.notas?.[1] ?? 0, 
                  2: req.body.notas?.[2] ?? 0, 
                  3: req.body.notas?.[3] ?? 0,
                  4: req.body.notas?.[4] ?? 0
                }
              }] : [],
          materias_bimestral: type === Type.BIMESTRAL
            ? [{
                nome: nome.toString(),
                bimestre: Number(bimestre),
                notas: { 
                  nota: req.body.notas?.nota ?? 0, 
                  conceito: req.body.notas?.conceito ?? 0
                }
              }] : []
        });
        await u.save();

        u.materias_anual = removeRedundance(mat.data, user.materias_anual);
        res.status(201).json({ success: true, data: u });
      } else {
        switch (type) {
          case Type.ANUAL:
            if (user.materias_anual.length >= 19) return res.status(400).json({ success: false, message: "Exceeded subjects limit" });
            if (user.materias_anual.some(m => m.nome.toLowerCase() === req.query.nome.toString().toLowerCase().trim())) {
              user.materias_anual[user.materias_anual.findIndex(m => m.nome.toLowerCase() === nome.toString().toLowerCase().trim())].notas = {
                1: req.body.notas?.[1] ?? 0, 
                2: req.body.notas?.[2] ?? 0, 
                3: req.body.notas?.[3] ?? 0,
                4: req.body.notas?.[4] ?? 0
              };
            } else {
              user.materias_anual.push({
                nome: nome.toString().trim(),
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
          case Type.BIMESTRAL:
            if (user.materias_bimestral.length >= 19) return res.status(400).json({ success: false, message: "Exceeded subjects limit" });
            if (user.materias_bimestral.some(m => m.nome.toLowerCase() === nome.toString().toLowerCase().trim() && Number(m.bimestre) === Number(bimestre))) {
              user.materias_bimestral[user.materias_bimestral.findIndex(m => m.nome === nome.toString().toLowerCase().trim() && m.bimestre === Number(bimestre))].notas = {
                nota: req.body.notas?.nota ?? 0, 
                conceito: req.body.notas?.conceito ?? 0
              };
            } else {
              user.materias_bimestral.push({
                nome: nome.toString().trim(),
                bimestre: Number(bimestre),
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

        user.materias_anual = removeRedundance(mat.data, user.materias_anual);
        res.status(201).json({ success: true, data: user });
      };
      break;
    case "DELETE":
      if (!user) return res.json({ success: false, data: null });
      if (!nome) return res.status(202).json({ success: false, data: user, message: "Missing name query" });
      if (!type) return res.status(202).json({ success: false, data: user, message: "Missing type query" });

      switch (type) {
        case Type.ANUAL:
          if (user.materias_anual.some(m => m.nome.toLowerCase() === nome.toString().toLowerCase())) {
            user.materias_anual.splice(user.materias_anual.findIndex(m => m.nome.toLowerCase() === nome.toString().toLowerCase()), 1);
            user.markModified("materias_anual");
            await user.save();

            user.materias_anual = removeRedundance(mat.data, user.materias_anual);
            res.status(201).json({ success: true, data: user });
          } else {
            user.materias_anual = removeRedundance(mat.data, user.materias_anual);
            res.status(304).json({ success: false, data: user });
          } 
          break;
        case Type.BIMESTRAL:
          if (user.materias_bimestral.some(m => m.nome.toLowerCase() === nome.toString().toLowerCase() && m.bimestre === Number(bimestre))) {
            user.materias_bimestral.splice(user.materias_bimestral.findIndex(m => m.nome.toLowerCase() === nome.toString().toLowerCase()), 1);
            user.markModified("materias_bimestral");
            await user.save();

            user.materias_anual = removeRedundance(mat.data, user.materias_anual);
            res.status(201).json({ success: true, data: user });
          } else {
            user.materias_anual = removeRedundance(mat.data, user.materias_anual);
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
