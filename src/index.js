import './css/normalise.css';
import Tree from './module/tree';

function generateRandomSortedArray(length) {
    // Generate an array with random numbers less than 100
    const array = Array.from({ length }, () => Math.floor(Math.random() * 100));

    // Sort the array in ascending order
    array.sort((a, b) => a - b);

    return array;
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

// Example: Generate a random sorted array with 10 elements
let arr = generateRandomSortedArray(10);

arr = [1, 3, 6, 2, 0];

const tree = new Tree(arr);
tree.insert(9);
tree.insert(10);
tree.insert(8);
tree.insert(-1);
tree.delete(2);
tree.delete(6);
const treeRoot = tree.root;

prettyPrint(treeRoot);

const a = function (node) {
    const data = node.getData();
    console.log(data * 10);
};

tree.preOrder(a);

const b = tree.find(-1);
console.log(tree.depth(b));

console.log(tree.isBalanced());
