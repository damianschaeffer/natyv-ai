import { forwardRef, SVGProps } from "react";

export type TikTokIconProps = SVGProps<SVGSVGElement>;

const TikTokIcon = forwardRef<SVGSVGElement, TikTokIconProps>(
  ({ width = 24, height = 24, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
);

TikTokIcon.displayName = "TikTokIcon";

export default TikTokIcon;
