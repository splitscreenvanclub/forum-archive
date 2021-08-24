import { NextRouter } from "next/router";

export function queryParamFrom(router: NextRouter, param: string) {
  let val = router.query[param];

  if (val == null) {
    const match = router.asPath.match(new RegExp(`[&?]${param}=(.*?)(&|$)`));

    val = match && match[1];
  }

  if (Array.isArray(val)) {
    return val[0];
  }

  return val;
}