Thank you for the interesting challenge.

A few points, to help explain my choices and start a conversation:

- I followed the pattern of using a constructor function, extending the prototype, although I would have changed the implementation of the `Item` class.
- I renamed the `update_quality` fn to `updateItems`, as it is also updating the `sell_in` property of the item.
- Much of the logic should not be in the `updateItem` function, but behind an `Item` factory method, so that the Item can update itself in a better way than the one presented here. Not being able to change the `Item` class, I worked around it. I would have instead used factory method to create an instance of the right item, given the properties if the object passed in.
- I switched to jest just because it made testing easier and quicker. The texttest file was not actually testing the file as far as I could see, so I focussed on the jest unit tests.