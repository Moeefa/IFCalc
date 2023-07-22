import { NextResponse } from "next/server";
import { authOptions } from "@/src/lib/auth";
import axios from "axios";
import { draftMode } from "next/headers";
import { getServerSession } from "next-auth";

export async function GET() {
  const { isEnabled } = draftMode();
  if (isEnabled) return NextResponse.json([
    {
      nome: "Teste 1",
      notas: { "1": 0, "2": 0, "3": 0 }
    },
    {
      nome: "Teste 2",
      notas: { "1": 10, "2": 10, "3": 10 }
    }
  ]);

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
