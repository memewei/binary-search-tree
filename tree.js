import Node from "./node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
    this.levelOrderTransversed = [];
    this.preorderTransversed = [];
    this.inorderTransversed = [];
    this.postorderTransversed = [];
  }

  buildTree(array) {
    const sorted = this.sortArray(array);
    const uniqueArray = this.deleteDuplicates(sorted);
    const n = uniqueArray.length;
    const root = this.sortedToTree(uniqueArray, 0, n - 1);
    return root;
  }

  sortArray(array) {
    const sort = array.sort((a, b) => a - b);
    return sort;
  }

  deleteDuplicates(array) {
    const uniques = [...new Set(array)];
    return uniques;
  }

  sortedToTree(array, start, end) {
    if (start > end) {
      return null;
    }
    const mid = parseInt((start + end) / 2, 10);
    const node = new Node(array[mid]);
    node.left = this.sortedToTree(array, start, mid - 1);
    node.right = this.sortedToTree(array, mid + 1, end);
    return node;
  }

  insert(data, node = this.root) {
    if (node === null) {
      node = new Node(data);
      return node;
    }

    if (data < node.data) node.left = this.insert(data, node.left);
    else if (data > node.data) node.right = this.insert(data, node.right);
    return node;
  }

  delete(data, node = this.root) {
    if (node === null) return node;

    if (data < node.data) node.left = this.delete(data, node.left);
    else if (data > node.data) node.right = this.delete(data, node.right);
    else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      node.data = this.minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }
    return node;
  }

  minValue(node) {
    let minV = node.data;
    while (node.left !== null) {
      minV = node.left.data;
      node = node.left;
    }
    return minV;
  }

  find(data, node = this.root) {
    if (node.data === data) return node;

    if (data < node.data) return this.find(data, node.left);
    else if (data > node.data) return this.find(data, node.right);
  }

  levelOrder(func = this.toArray) {
    this.levelOrderTransversed = [];
    if (this.root === null) return;
    const queue = [];
    queue.push(this.root);
    while (queue.length > 0) {
      const node = queue[0];
      func(this.levelOrderTransversed, node.data);
      if (node.left !== null) queue.push(node.left);
      else if (node.right !== null) queue.push(node.right);
      queue.shift();
    }
    return this.levelOrderTransversed;
  }

  inorder() {
    this.inorderTransversed = [];
    return this.recInorder();
  }

  recInorder(func = this.toArray, node = this.root) {
    if (node === null) return;
    this.recInorder(func, node.left);
    func(this.inorderTransversed, node.data);
    this.recInorder(func, node.right);
    return this.inorderTransversed;
  }

  preorder() {
    this.preorderTransversed = [];
    return this.recPreorder();
  }

  recPreorder(func = this.toArray, node = this.root) {
    if (node === null) return;
    func(this.preorderTransversed, node.data);
    this.recPreorder(func, node.left);
    this.recPreorder(func, node.right);
    return this.preorderTransversed;
  }

  postorder() {
    this.postorderTransversed = [];
    return this.recPreorder();
  }

  recPostorder(func = this.toArray, node = this.root) {
    if (node === null) return;
    this.recPostorder(func, node.left);
    this.recPostorder(func, node.right);
    func(this.postorderTransversed, node.data);
    return this.postorderTransversed;
  }

  toArray(array, value) {
    array.push(value);
  }

  height(node) {
    if (node === null) return 0;
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(data, node = this, root) {
    if (node.data === data.data) return 0;
    if (data.data < node.data) return this.depth(data, node.left) + 1;
    if (data.data > node.data) return this.depth(data, node.right) + 1;
  }

  checkBalanced() {
    const allNodes = this.inorder();
    for (let i = 0; i < allNodes.length; i++) {
      const node = this.find(allNodes[i]);
      const leftSubTree = this.height(node.left);
      const rightSubTree = this.height(node.right);
      if (Math.abs(leftSubTree - rightSubTree) > 1) return false;
    }
    return true;
  }

  rebalance() {
    const currentTree = this.inorder();
    this.root = this.buildTree(currentTree);
  }
}
