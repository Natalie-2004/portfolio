"use client";

import Link, { type LinkProps } from "next/link";
import type { MouseEventHandler, ReactNode } from "react";
import { usePageTransition } from "./PageTransitionProvider";

type Props = Omit<LinkProps, "onClick"> & {
  className?: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

function isInternalHref(href: string) {
  return !/^(https?:|mailto:|tel:)/i.test(href);
}

/**
 * Internal navigation with staggered page transition. Uses Next Link for prefetch/accessibility.
 */
export default function TransitionLink({
  href,
  className,
  children,
  scroll,
  onClick,
  prefetch,
  ...rest
}: Props) {
  const { navigate } = usePageTransition();

  return (
    <Link
      href={href}
      scroll={scroll}
      prefetch={prefetch}
      className={className}
      onClick={(e) => {
        onClick?.(e);
        if (e.defaultPrevented) return;
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        if (typeof href !== "string" || !isInternalHref(href)) return;
        e.preventDefault();
        navigate(href);
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
