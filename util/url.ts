import { NextRouter } from "next/router";

export function queryParamFrom(router: NextRouter, param: string) {
  const val = router.query[param];

  if (Array.isArray(val)) {
    return val[0];
  }

  return val;
}