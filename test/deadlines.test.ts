import { describe, expect, it } from "vitest";
import { approvedCivilDay, isPastDeadline } from "../src/deadlines.ts";

describe("prazo de aprovação da entrega", () => {
  it("considera o dia civil de São Paulo para a aprovação do incidente", () => {
    expect(approvedCivilDay("2026-03-13T01:02:00.000Z")).toBe("2026-03-12");
    expect(isPastDeadline("2026-03-13T01:02:00.000Z", "2026-03-12")).toBe(false);
  });

  it("aceita aprovação no último milissegundo do dia do prazo", () => {
    expect(isPastDeadline("2026-03-13T02:59:59.999Z", "2026-03-12")).toBe(false);
  });

  it("recusa aprovação à meia-noite do dia seguinte ao prazo em São Paulo", () => {
    expect(isPastDeadline("2026-03-13T03:00:00.000Z", "2026-03-12")).toBe(true);
  });

  it("converte a data de aprovação com deslocamento UTC explícito para o dia de São Paulo", () => {
    expect(approvedCivilDay("2026-03-13T04:02:00.000+03:00")).toBe("2026-03-12");
  });

  it("respeita o horário de verão de São Paulo em datas históricas", () => {
    expect(isPastDeadline("2018-01-16T01:59:59.999Z", "2018-01-15")).toBe(false);
    expect(isPastDeadline("2018-01-16T02:00:00.000Z", "2018-01-15")).toBe(true);
  });
});
