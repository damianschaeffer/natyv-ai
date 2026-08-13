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
    expect(screen.getByText("Cozi Max")).toBeInTheDocument();
    expect(screen.getByLabelText("89/100")).toBeInTheDocument();
    expect(screen.getByText("Google Calendar")).toBeInTheDocument();
    expect(screen.getByText("AnyList")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /open full comparison/i })).toHaveAttribute("href", "/assessment/example?view=full");
  });
});
