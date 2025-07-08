class Tree {
	constructor(array) {
		this.array = array;
		this.root = this.buildTree(this.array);
	}

	buildTree(array) {
		array.sort((a, b) => a - b);
		array = [...new Set(array)];
		if (array.length == 0) {
			return null;
		} else {
			let start = 0;
			let end = array.length;
			let mid = Math.floor((start + end) / 2);
			const root = new Node(array[mid]);

			root.left = this.buildTree(array.slice(start, mid));
			root.right = this.buildTree(array.slice(mid + 1, end));
			return root;
		}
	}

	insert(value) {
		let currentNode = this.root;
		while (currentNode != null) {
			if (value == currentNode.data) {
				return;
			} else if (value > currentNode.data) {
				if (currentNode.right != null) {
					currentNode = currentNode.right;
				} else {
					currentNode.right = new Node(value);
				}
			} else if (value < currentNode.data) {
				if (currentNode.left != null) {
					currentNode = currentNode.left;
				} else {
					currentNode.left = new Node(value);
				}
			}
		}
	}

	deleteItem(value) {
		let targetNode = this.find(value);
		if (targetNode == null) {
			return;
		}
		if (targetNode.left == null && targetNode.right == null) {
			// If target has no children
			targetNode = this.root;
			let targetParent = null;
			while (targetNode.data != value) {
				if (value < targetNode.data) {
					targetParent = targetNode;
					targetNode = targetNode.left;
				} else if (value > targetNode.data) {
					targetParent = targetNode;
					targetNode = targetNode.right;
				}
			}
			if (targetParent.right == targetNode) {
				targetParent.right = null;
			} else if (targetParent.left == targetNode) {
				targetParent.left = null;
			}
		} else if (targetNode.right == null || targetNode.left == null) {
			// If target has 1 child
			targetNode = this.root;
			let targetParent = null;
			while (targetNode.data != value) {
				if (value < targetNode.data) {
					targetParent = targetNode;
					targetNode = targetNode.left;
				} else if (value > targetNode.data) {
					targetParent = targetNode;
					targetNode = targetNode.right;
				}
			}
			if (targetNode.left != null) {
				if (targetParent.right == targetNode) {
					targetParent.right = targetNode.left;
				} else if (targetParent.left == targetNode) {
					targetParent.left = targetNode.left;
				}
			} else if (targetNode.right != null) {
				if (targetParent.right == targetNode) {
                    targetParent.right = targetNode.right;
                } else if (targetParent.left == targetNode) {
                    targetParent.left = targetNode.right;
                }
			}
		} else if (targetNode.left != null && targetNode.right != null) {
            // if target has 2 children
            let rightSubtree = targetNode.right;
            while (rightSubtree.left != null) {
                rightSubtree = rightSubtree.left;
            }
            let newValue = rightSubtree.data;
            this.deleteItem(rightSubtree.data);
            targetNode.data = newValue;
		}
	}

	find(value) {
		let currentNode = this.root;
		while (currentNode != null) {
			if (value == currentNode.data) {
				return currentNode;
			}
			if (value < currentNode.data) {
				currentNode = currentNode.left;
			} else if (value > currentNode.data) {
				currentNode = currentNode.right;
			}
		}
		return null;
	}
}

class Node {
	constructor(data, left = null, right = null) {
		this.data = data;
		this.left = left;
		this.right = right;
	}
}

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

const t = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9]);
