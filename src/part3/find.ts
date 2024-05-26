import R = require("ramda");
import { Result, makeFailure, makeOk, bind, either } from "../lib/result";
import { rm } from "fs";
import { resourceLimits } from "worker_threads";

/* Library code */
const findOrThrow = <T>(pred: (x: T) => boolean, a: T[]): T => {
    for (let i = 0; i < a.length; i++) {
        if (pred(a[i])) return a[i];
    }
    throw "No element found.";
}

export const findResult: <T>(pred: (x: T) => boolean, a: T[]) => Result<T> = <T>(pred: (x: T) => boolean, a: T[]): Result<T> => {
    return findHelper(pred, a, 0);
}

export const findHelper: <T>(pred: (x: T) => boolean, a: T[], curr: number) => Result<T> = <T>(pred: (x: T) => boolean, a: T[], curr: number): Result<T> => {
    if (curr === a.length)
        return makeFailure("Can't find an element.");
    else if (pred(a[curr]))
        return makeOk(a[curr]);

    return findHelper(pred, a, curr + 1);
}

/* Client code */
const returnSquaredIfFoundEven_v1 = (a: number[]): number => {
    try {
        const x = findOrThrow(x => x % 2 === 0, a);
        return x * x;
    } catch (e) {
        return -1;
    }
}

export const returnSquaredIfFoundEven_v2: <T>(a: number[]) => Result<number> = <T>(a: number[]): Result<number> => {
    return bind(findResult(x => x % 2 === 0, a), x => makeOk(x * x));
}

export const returnSquaredIfFoundEven_v3: (a: number[]) => number = <T>(a: number[]): number => {
    return either(findResult(x => x % 2 === 0, a), x => x * x, x => -1);
}
