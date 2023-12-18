import Node from './node';
import mergeSort from './merge-sort';

export default class Tree {
    root;

    arr;

    constructor(arr) {
        const start = 0;
        const end = arr.length - 1;

        this.arr = arr;
        this.arr = mergeSort(arr);
        this.root = this.buildTree(this.arr, start, end);
    }

    get getRoot() {
        return this.root;
    }

    buildTree(arr, start, end) {
        // find middle
        // return if start > end (array at the bottom leaf nodes)
        // create node with middle
        // set left with build tree
        // set right with build tree
        // return node

        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const newNode = new Node(arr[mid]);

        newNode.setLeftChild(this.buildTree(arr, start, mid - 1));
        newNode.setRightChild(this.buildTree(arr, mid + 1, end));

        return newNode;
    }

    /* traverse through the tree to find the val, then remove it
    then redraw the tree
    - keep on looping through the tree until you find the value */
    insert(val) {
        this.checkForNodeInsert(this.root, val);
    }

    // return false if node already exists with the value
    // return true if node
    // pass in the node, if
    checkForNodeInsert(node, val) {
        // conditions to return and do nothing
        // - val already exists
        // - no more child nodes left
        const data = node.getData();
        const leftChild = node.getLeftChild();
        const rightChild = node.getRightChild();
        if (data === val) return;

        if (val < data && leftChild) this.checkForNodeInsert(leftChild, val);
        if (val > data && rightChild) this.checkForNodeInsert(rightChild, val);

        // if left or right empty, then add the node
        if (val < data && !leftChild) {
            const newNode = new Node(val);
            node.setLeftChild(newNode);
        }

        if (val > data && !rightChild) {
            const newNode = new Node(val);
            node.setRightChild(newNode);
        }
    }

    /* Handle 3 cases
        1: Delete leaf node, can just delete straight away
        2: Delete node with a child, swap the two then delete
        3: Delete node with 2 children, swap with inorder successor then delete    
    */
    delete(val) {
        this.deleteNode(this.root, val);
        // console.log(this.root.getData());
    }

    /* Handle 3 cases
    1: Delete leaf node, can just delete straight away
    2: Delete node with a child, swap the two then delete
    3: Delete node with 2 children, swap with inorder successor then delete    
    */

    deleteNode(root, k) {
        // Base case
        if (root === null) {
            return root;
        }

        // Recursive calls for ancestors of
        // node to be deleted
        if (k < root.getData()) {
            root.setLeftChild(this.deleteNode(root.getLeftChild(), k));
            return root;
        }
        if (k > root.getData()) {
            root.setRightChild(this.deleteNode(root.getRightChild(), k));
            return root;
        }

        // We reach here when root is the node
        // to be deleted.

        // If one of the children is empty
        if (root.getLeftChild() === null) {
            const temp = root.getRightChild();
            // root = null; // Set root to null instead of using delete
            return temp;
        }
        if (root.getRightChild() === null) {
            const temp = root.getLeftChild();
            // root = null; // Set root to null instead of using delete
            return temp;
        }

        // If both children exist

        let succParent = root;

        // Find successor
        let succ = root.getRightChild();
        while (succ.getLeftChild() !== null) {
            succParent = succ;
            succ = succ.getLeftChild();
        }

        // Delete successor. Since the successor
        // is always the left child of its parent,
        // we can safely make the successor's right
        // child as the left of its parent.
        // If there is no succ, then assign
        // succ.getRightChild() to succParent.setRightChild()
        if (succParent !== root) {
            succParent.setLeftChild(succ.getRightChild());
        } else {
            succParent.setRightChild(succ.getRightChild());
        }

        // Copy Successor Data to root
        root.setData(succ.getData());

        // Set successor to null instead of using delete
        succ = null;

        return root;
    }

    levelOrder(cb) {
        if (this.root === null) return this.arr;

        const queue = [];
        queue.push(this.root);

        while (queue.length !== 0) {
            const current = queue.shift();
            cb(current);
            if (current.getLeftChild()) queue.push(current.getLeftChild());
            if (current.getRightChild()) queue.push(current.getRightChild());
        }
    }

    inOrder(cb, root = this.root) {
        if (root === null) return root;

        this.inOrder(cb, root.getLeftChild());
        cb(root);
        this.inOrder(cb, root.getRightChild());
    }

    preOrder(cb) {
        if (this.root === null) return this.arr;

        const stack = [];
        stack.push(this.root);

        while (stack.length !== 0) {
            const current = stack.pop();
            cb(current);
            if (current.getRightChild()) stack.push(current.getRightChild());
            if (current.getLeftChild()) stack.push(current.getLeftChild());
        }
    }

    postOrder(cb, root = this.root) {
        if (root === null) return;

        this.postOrder(cb, root.getLeftChild());
        this.postOrder(cb, root.getRightChild());
        cb(root);
    }

    find(value) {
        return this.findNode(this.root, value);
    }

    findNode(node, value) {
        if (node === null) {
            return null; // Value not found
        }

        const nodeValue = node.getData();

        if (value === nodeValue) {
            return node; // Node with the given value found
        }
        if (value < nodeValue) {
            return this.findNode(node.getLeftChild(), value);
        }
        return this.findNode(node.getRightChild(), value);
    }

    height(node) {
        if (node === null) {
            return -1; // Height of an empty tree is -1
        }

        const leftHeight = this.height(node.getLeftChild());
        const rightHeight = this.height(node.getRightChild());

        return Math.max(leftHeight, rightHeight) + 1;
    }

    /* 
        start from the root, search until the node is found
        for each return, do + 1
    */
    depth(node) {
        const depth = this.depthNode(this.root, node.getData());
        return `Depth: ${depth}`;
    }

    depthNode(node, value) {
        if (node === null) {
            return -1; // Value not found
        }

        const nodeValue = node.getData();

        // Node with the given value found
        if (value === nodeValue) {
            return 1;
        }

        // go to different branches to continue searching
        if (value < nodeValue) {
            return this.depthNode(node.getLeftChild(), value) + 1;
        }
        return this.depthNode(node.getRightChild(), value) + 1;
    }

    /* 
        return true or false depending on if height of left and right subtrees differe less at most 1
    */
    isBalanced(node = this.root) {
        if (node === null) {
            return -1; // Height of an empty tree is -1
        }

        const leftHeight = this.height(node.getLeftChild());
        const rightHeight = this.height(node.getRightChild());

        return Math.abs(leftHeight - rightHeight) <= 1;
    }

    rebalance() {
        const nodesArray = this.inOrderTraversal(this.root);
        this.root = this.buildTree(nodesArray, 0, nodesArray.length - 1);
    }

    inOrderTraversal(node) {
        const result = [];

        function traverse(node) {
            if (node !== null) {
                traverse(node.getLeftChild());
                result.push(node.getData());
                traverse(node.getRightChild());
            }
        }

        traverse(node);

        return result;
    }
}
