export default class Tree {
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

  levelOrder(callback) {
    if (callback == undefined) {
      throw new Error("Callback function must be provided for tree traversal");
    } else {
      const queue = [this.root];
      while (queue.length > 0) {
        let currentNode = queue.shift();
        if (currentNode.left) {
          queue.push(currentNode.left);
        }
        if (currentNode.right) {
          queue.push(currentNode.right);
        }
        callback(currentNode.data);
      }
    }
  }

  preOrder(callback, node = this.root) {
    if (callback == undefined) {
      throw new Error("Callback function must be provided for tree traversal");
    }
    if (node == null) {
      return;
    } else {
      callback(node.data);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }
  }

  inOrder(callback, node = this.root) {
    if (callback == undefined) {
      throw new Error("Callback function must be provided for tree traversal");
    }
    if (node == null) {
      return;
    } else {
      this.inOrder(callback, node.left);
      callback(node.data);
      this.inOrder(callback, node.right);
    }
  }

  postOrder(callback, node = this.root) {
    if (callback == undefined) {
      throw new Error("Callback function must be provided for tree traversal");
    }
    if (node == null) {
      return;
    } else {
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node.data);
    }
  }

  height(value) {
    let node = this.find(value);
	if(node == null) {
		return null;
	}
    if ((node.left == null && node.right == null)) {
      return 0;
    } else {
      if (node.left && node.right) {
        return (
          1 +
          Math.max(this.height(node.left.data), this.height(node.right.data))
        );
      }
	  else if (node.left) {
		return 1 + this.height(node.left.data);
	  }
	  else {
		return 1 + this.height(node.right.data);
	  }
    }
  }

  depth(value) {
	if(this.find(value) == null) {
		return null;
	}
	let currentNode = this.root;
	let currentDepth = 0;
    while (currentNode != null) {
      if (value == currentNode.data) {
        return currentDepth;
      }
      if (value < currentNode.data) {
        currentNode = currentNode.left;
      } else if (value > currentNode.data) {
        currentNode = currentNode.right;
      }
	  currentDepth++;
    }
  }

  isBalanced(root=this.root) {
	if(root.left == null && root.right == null) {
		return true;
	}
	if(Math.abs(this.height(root.left.data) - this.height(root.right.data)) > 1) {
		return false;
	}
	else {
		return this.isBalanced(root.left.data) && this.isBalanced(root.right.data);
	}
  }

  rebalance() {
	let arr = [];
	this.inOrder((value) => arr.push(value));
	this.root = this.buildTree(arr);
  }
}

class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}


