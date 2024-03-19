import { auth } from "@/auth";
import axios from "axios";

export const GET = auth(async (req) => {
  if (!req.auth) return Response.json("Unauthorized", { status: 401 });

  const year = new Date().getFullYear();

  try {
    const res = await axios.get(
      `https://suap.ifmt.edu.br/api/v2/minhas-informacoes/boletim/${year}/1/`,
      {
        timeout: 15_000,
        signal: AbortSignal.timeout(15_000),
        headers: {
          Authorization: `Bearer ${req.auth?.access_token}`,
        },
      }
    );

    const filtered = res.data.filter((a: any) => a.situacao !== "Transferido");
    const data = filtered.reduce(
      (a: any, b: any) => [
        ...a,
        {
          name: b.disciplina
            .slice(b.disciplina.indexOf("-") + 1, b.disciplina.length)
            .replace(/(III|II|I)$/, "")
            .trim(),
          grades: [...Array(4)].map(
            (_, i) => b[`nota_etapa_${i + 1}`].nota?.replace(",", ".") || "0"
          ),
          final:
            b.media_final_disciplina?.replace(",", ".") ||
            (
              [...Array(4)]
                .map(
                  (_, i) =>
                    b[`nota_etapa_${i + 1}`].nota?.replace(",", ".") || "0"
                )
                .reduce((a, b, i) => a + (i > 1 ? b * 3 : b * 2) || 0, 0) /
              (2 + 2 + 3 + 3)
            ).toFixed(1),
          frequency: b.percentual_carga_horaria_frequentada,
          studying: [...Array(4)]
            .map(
              (_, i) =>
                b[`nota_etapa_${i + 1}`].nota === "" ||
                b[`nota_etapa_${i + 1}`].nota === null
            )
            .every((a: boolean) => a === true),
        },
      ],
      []
    );

    const frequency =
      (filtered.reduce(
        (a: any, b: any) => a + b.percentual_carga_horaria_frequentada,
        0
      ) -
        4) /
      filtered.length;

    return Response.json({ frequency, subjects: data });
  } catch (e: any) {
    return Response.json(
      e?.response.data.detail || "An internal error occurred",
      { status: 500 }
    );
  }
});
