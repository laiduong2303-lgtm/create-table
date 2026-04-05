import { useRouter as useNextRouter } from "next/navigation";
import { routes } from "./routes";

export interface CustomRouter {
  push: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
  forward: () => void;
  refresh: () => void;
  prefetch: (path: string) => void;
  goToUserDetail: (id: string) => void;
}

export function useRouter(): CustomRouter {
  const router = useNextRouter();

  return {
    push: (path) => {
      router.push(path);
    },
    replace: (path) => {
      router.replace(path);
    },
    back: () => {
      router.back();
    },
    forward: () => {
      router.forward();
    },
    refresh: () => {
      router.refresh();
    },
    prefetch: (path) => {
      router.prefetch(path);
    },
    goToUserDetail: (id) => {
      const path = routes.userDetail(id);
      console.log(`Going to user detail: ${path}`);
      router.push(path);
    },
  };
}