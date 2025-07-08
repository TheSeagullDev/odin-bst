// DRIVER FILE
import Tree from "./BinarySearchTree.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.right !== null) {
		prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
	if (node.left !== null) {
		prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

function randArr(max, length) {
	const arr = [];
	for (let i = 0; i < length; i++) {
		arr.push(Math.floor(Math.random() * (max + 1)));
	}
	return arr;
}

const tree = new Tree(randArr(100, 7));
prettyPrint(tree.root);
console.log(`Is balanced? ${tree.isBalanced()}`);
console.log("Printing level order traversal");
tree.levelOrder(console.log);
console.log("Printing preorder traversal");
tree.preOrder(console.log);
console.log("Printing inorder traversal");
tree.inOrder(console.log);
console.log("Printing postorder traversal");
tree.postOrder(console.log);
console.log("Adding new values to unbalance tree");
const newElements = randArr(300, 7);
newElements.forEach((elem) => tree.insert(elem));
prettyPrint(tree.root);
console.log(`Is balanced? ${tree.isBalanced()}`);
console.log("Rebalancing tree");
tree.rebalance();
prettyPrint(tree.root);
console.log(`Is balanced? ${tree.isBalanced()}`);
console.log("Printing level order traversal");
tree.levelOrder(console.log);
console.log("Printing preorder traversal");
tree.preOrder(console.log);
console.log("Printing inorder traversal");
tree.inOrder(console.log);
console.log("Printing postorder traversal");
tree.postOrder(console.log);
console.log("Testing complete");