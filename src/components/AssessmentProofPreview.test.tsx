import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AssessmentProofPreview from "./AssessmentProofPreview";

describe("AssessmentProofPreview", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the finished product-like decision preview by default when compact", () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}", { status: 200 }))));

    render(<AssessmentProofPreview compact />);

    expect(screen.getByTestId("assessment-report-preview")).toBeInTheDocument();
    expect(screen.getByText("MyAgent Foundation")).toBeInTheDocument();
    expect(screen.getByLabelText("91/100")).toBeInTheDocument();
    expect(screen.getByText("Ruby")).toBeInTheDocument();
    expect(screen.getByText("Google Voice")).toBeInTheDocument();
    expect(screen.getByText("Missed-call capture and 24/7 front desk")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open full comparison/i })).toHaveAttribute("href", "/assessment/example?view=full");
  });
});
