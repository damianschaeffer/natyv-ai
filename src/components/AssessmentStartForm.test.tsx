import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AssessmentStartForm from "./AssessmentStartForm";

describe("AssessmentStartForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("keeps the legacy start anchor on the actual form for mobile CTA handoffs", () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}", { status: 200 }))));

    render(<AssessmentStartForm />);

    const form = screen.getByRole("button", { name: "Start my 15-minute assessment" }).closest("form");
    expect(form).toHaveAttribute("id", "start");
    expect(form?.closest("#assessment-form")).toBeInTheDocument();
  });

  it("supports a compact handoff without repeating the full next-step explainer", () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}", { status: 200 }))));

    render(<AssessmentStartForm compact />);

    expect(screen.queryByTestId("assessment-next-steps")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Start my 15-minute assessment" })).toBeInTheDocument();
  });
});
