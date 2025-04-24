'use client';
import Link, { LinkProps } from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';

interface TransitionLinkProps extends LinkProps {
  children: React.ReactNode;
  href: string;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const AnimatedLink: React.FC<TransitionLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    const main = document.querySelector('.main-container');
    if (main) {
      main.classList.add('page-transition');
      main.addEventListener('transitionend', onTransitionEnd, { once: true });
      await sleep(500);
      router.push(href);
    } else {
      router.push(href);
    }

    async function onTransitionEnd() {
      await sleep(500);
      main?.classList.remove('page-transition');
    }
  };

  return (
    <Link {...props} href={href} onClick={handleTransition}>
      {children}
    </Link>
  );
};
