export default class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }

    setLeftChild(childNode) {
        this.left = childNode;
    }

    setRightChild(childNode) {
        this.right = childNode;
    }

    setData(val) {
        this.data = val;
    }

    getLeftChild() {
        return this.left;
    }

    getRightChild() {
        return this.right;
    }

    getData() {
        return this.data;
    }
}
