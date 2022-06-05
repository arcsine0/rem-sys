# How to Run this client?
Simply go to your terminal of choice, make sure that it's routed / run in the clients directory and type the following:
```
npm start
```
To stop the client, just go to the terminal and hit `CTRL + C`

# Client Directory and Structure
Inside the client folder you will see folders named `public` and `src`. The `src` folder is really the only folder you should know about. 

The `src` folder then contains the `components` and `pages` that our app will have and navigate through, as well as some other codes as well. The `components` are essentially just elements in the page (i.e. a card) that we can import in anything within the client directory. The `pages` are, well pages that are rendered and navigated through inside the `Landing.js` file. (the pages are also called components in React context, i just named them as pages based on their use case)

# Using components
Components are written in a function and the actual markup is then returned by it. To use this component on another component, you have to export it on the component code and import it to the other.
Ex. `Component.js` (the first letter should be capitalized)
```
function Component() {
    return(
        <div>Hello World</div>
    )
}

export default Component;
```
you can check the test component in `components` as an example.

To import this, use
```
import Component from '[directory]'

function AnotherComponent() {
    return(
        <Component />
    )
}

export default AnotherComponent;
```
make sure that the directory of the component is a relative path, use `./` to refer to files within the same folder, and `../` for a folder above so and so forth. TLDR na more periods before the slash, the higher the heirarchy to access  

in this instance
```
import Component from './Component'

function AnotherComponent() {
    return(
        <Component />
    )
}

export default AnotherComponent;
```



