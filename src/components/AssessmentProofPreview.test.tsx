import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import AssessmentProofPreview from "./AssessmentProofPreview";

describe("AssessmentProofPreview", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows the finished dental-office decision preview when compact", () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}", { status: 200 }))));

    render(<AssessmentProofPreview compact />);

    expect(screen.getByTestId("assessment-report-preview")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "MyAgent Foundation" })).toBeInTheDocument();
    expect(screen.getByLabelText("91/100")).toBeInTheDocument();
    expect(screen.getAllByText("Ruby").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Google Voice").length).toBeGreaterThan(0);
    expect(screen.getByRole("tab", { name: "Why it won" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("link", { name: /open full comparison/i })).toHaveAttribute("href", "/assessment/example?view=full");
  });

  it("lets the visitor click through ranked options while keeping Why it won selected", () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.resolve(new Response("{}", { status: 200 }))));

    render(<AssessmentProofPreview embedded />);

    fireEvent.click(screen.getByRole("tab", { name: /Ruby/i }));

    expect(screen.getByRole("tab", { name: /Ruby/i })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByRole("tab", { name: "Why it won" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText(/A person can cover overflow/i)).toBeInTheDocument();
  });
});
