// Source code from:
// https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392

/**
 * Takes any value ie object, string or interer etc
 * @param value
 * @constructor
 */
function Node(value) {
    this.data = value;
    this.previous = null;
    this.next = null;
}


/**
 * Empty contructor
 * @constructor
 */
function DoublyList() {
    this._length = 0;
    this.head = null;
    this.tail = null;
}

/**
 * Used for adding value to the linked list
 * @param value
 * @returns {Node}
 */
DoublyList.prototype.add = function(value) {
    var node = new Node(value);

    if (this._length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    } else {
        this.head = node;
        this.tail = node;
    }

    this._length++;

    return node;
};

/**
 * Used for searching the linked list for nodes at a given position
 * @param {integer} position
 * @returns {Node|*|null}
 */
DoublyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};

    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }

    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }

    return currentNode;
};

/**
 * Searches for a noda which has the specified data
 * @param data
 * @returns {number}
 */
DoublyList.prototype.searchForNode = function(data) {
    var currentNode = this.head,
        length = this._length;

    //Loop until next node is null.
    for (var count = 1; count <= length; count ++)
    {
        var node = this.searchNodeAt(count);
        if (node.data === data){
            return count;
        }
    }
    return -1;
};

/**
 * Removes node that has specifed data
 * @param data
 */
DoublyList.prototype.searchAndRemove = function(data) {

    this.remove(this.searchForNode(data));

}

/**
 * Removes a node at a specified position
 * @param position
 * @returns {*}
 */
DoublyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;

    console.log("Remove: " + position)

    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        console.log("Invalid: " + position);
        throw new Error(message.failure);
    }

    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;

        // 2nd use-case: there is a second node
        if (this.head != null) {
            this.head.previous = null;
            // 2nd use-case: there is no second node
        } else {
            this.tail = null;
        }

        // 3rd use-case: the last node is removed
    } else if (position === this._length) {
        this.tail = this.tail.previous;
        this.tail.next = null;
        // 4th use-case: a middle node is removed
    } else {
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }

        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;

        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }

    this._length--;

    return message.success;
};