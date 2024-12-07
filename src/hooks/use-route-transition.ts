import { useEffect, type MouseEvent } from 'react';
import {
  useNavigate,
  useLocation,
  type LinkProps,
} from '@tanstack/react-router';
import { useAnimate } from 'motion/react';
import { useRouteTransitionContext } from '../context/RouteTransitionContext/RouteTransitionContext.hook';

export const useRouteTransition = () => {
  const navigate = useNavigate();
  const pathname = useLocation({
    select: (location) => location.pathname,
  });
  const [scope, animate] = useAnimate();

  const { isRouteTransition, setIsRouteTransition } =
    useRouteTransitionContext();

  const variants = {
    variants: {
      hidden: { opacity: 0, filter: 'blur(2px)' },
      visible: { opacity: 1, filter: 'blur(0px)' },
    },
    initial: 'hidden',
    animate: 'visible',
  };

  const handleNavigate = (event: MouseEvent, linkProps: LinkProps) => {
    event.preventDefault();

    if (linkProps.to === pathname) return;

    setIsRouteTransition(true);
    setTimeout(() => {
      void navigate(linkProps);
    }, 400);
  };

  useEffect(() => {
    if (isRouteTransition) {
      setIsRouteTransition(false);
    }
  }, [isRouteTransition, setIsRouteTransition]);

  useEffect(() => {
    if (!scope.current) return;

    if (isRouteTransition) {
      void animate(
        scope.current,
        {
          opacity: 0,
          filter: 'blur(12px)',
        },
        {
          duration: 0.6,
          ease: [0.165, 0.84, 0.44, 1],
          type: 'tween',
        },
      );
    }
  }, [isRouteTransition, animate, scope]);

  return { handleNavigate, pathname, scope, variants };
};
