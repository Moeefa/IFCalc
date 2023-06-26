import axios from "axios";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";


export async function GET() {
  const session = await getServerSession(authOptions);
  const res = await axios.get("https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/2023/1/", {
    timeout: 15_000,
    signal: AbortSignal.timeout(15_000),
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    }
  });

  const data = res.data
    .filter((a: any) => a.situacao !== "Transferido")
    .reduce((a: any, b: any) => ([
      ...a,
      {
        nome: b.disciplina.slice(b.disciplina.indexOf("-") + 1, b.disciplina.length).replace(/(III|II|I)/g, "").trim(),
        notas: {
          "1": Number(b.nota_etapa_1.nota?.replace(",", ".")),
          "2": Number(b.nota_etapa_2.nota?.replace(",", ".")),
          "3": Number(b.nota_etapa_3.nota?.replace(",", ".")),
          "4": Number(b.nota_etapa_4.nota?.replace(",", ".")),
        }
      }
    ]), []);

  return NextResponse.json(data);
}
