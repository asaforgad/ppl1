import * as R from "ramda";
import { workerData } from "worker_threads";
//test
const stringToArray = R.split("");

/* Question 1 */
export const countVowels: (word: string) => number = (word: string): number => {
    const f = R.pipe(
       (x: string) => stringToArray(word),
        (x: string[]) => R.filter(isVowel, x),
        (x: string[]) => x.length
        );

    return f(word);
}

const isVowel = (str: string) => (str === 'a' || str === 'o' || str === 'e' || str === 'i' || str === 'u') ? true : false;

/* Question 2 */
export const isPaired: (word: string) => boolean = (word: string): boolean => {
    const f = R.pipe(
        (x: string) => stringToArray(word),
        (x: string[]) => R.filter(isSign, x),  
        );

        return R.reduce(func, "", f(word)) === "";
    
}

const func: (acc: string, letter: string) => string = (acc: string, letter: string): string => {
    if (letter==='('||letter==='{'||letter==='[')
        return acc.concat(letter);
    else if (letter===")" && acc.charAt(acc.length-1)=="("){
            return acc.substring(0,acc.length-1)
    }
    else if (letter==="]" && acc.charAt(acc.length-1)=="["){
            return acc.substring(0,acc.length-1)
    }else if (letter==="}" && acc.charAt(acc.length-1)=="{"){
            return acc.substring(0,acc.length-1)
    }else return "a"
}


const isSign = ((str: string) => (str === '(' || str === ')' || str === '{' || str === '}' || str === '[' || str === ']') ? true : false);




    



/* Question 3 */
export type WordTree = {
    root: string;
    children: WordTree[];
}

export const treeToSentence : (tree: WordTree) => string = (tree: WordTree): string => {
    return connectWords("", tree);
}

const connectWords: (s: string, tree: WordTree) => string = (s: string, tree: WordTree): string => {
    if (tree.children.length==0)
        return s.concat(tree.root.concat(" "));
    else return s.concat(tree.root.concat(" ")).concat(R.reduce(connectWords,"",tree.children));

}

const main = () => {
    const t1: WordTree = {
        root: "Hello",
        children: [
        {
        root: "students",
        children: [
        {
        root: "how",
        children: []
        }
        ]
        },
        {
        root: "are",
        children: []
        },
        {
        root: "you?",
        children: []
        },
        ]
        }

        console.log(treeToSentence(t1));
}

main();



