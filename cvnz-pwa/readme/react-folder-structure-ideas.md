


# Demystifying the Folder Structure of a React App
* https://medium.com/swlh/demystifying-the-folder-structure-of-a-react-app-c60b29d90836

Now, let’s go over the folders one by one and the and understand the motivation behind them and the type of files you would store in them:

* Assets: This folder contains all the media assets, such as images, videos, json files, etc..
* Components: This folder contains all the Presentational/Stateless Components as discussed above.
* Containers: The name is pretty self-explanatory. It contains all the Stateful Components as discussed above.

> For each component or container, you would create a subfolder and then name it with the same name as the component and inside that create the js/jsx file for your component. Here’s what it would look like:

Here you see two ways you can name your files. You can either use index or name the file as the name of the component. The only major difference it would make is in the import statements. Suppose you want to use the Footer component in Home, then the two imports , respectively, would be:-
import Footer from ‘../components/Footer
and

import Footer from ‘../components/Footer/Footer
3. Context: This folder contains all your context files if you are working with the Context API. These files can be directly added to the context folder without wrapping in a subfolder but you could also do that. Learn more about the Context API here.

4. Hoc: Higher Order Components or HOCs are special type of Components which wrap your conventional Components/Containers to add some features or functionality to the Wrapped Components. HOCs, like any other Component can be reused. HOCs are widely used for a variety of functionality and is something you definitely want to get used to. These files could also be directly added in the hoc folder without wrapping in a subfolder but you could do that as well. Learn more about HOCs here.
* eg. src/hoc/ProtectedRoute/ProtectedRoute.js
* eg. src/hoc/withProps/withProps.js

5. Store: In large applications where there is a lot of information to be stored and managed in state, it is preferable to use global state or a store. This provides an efficient way of state management in your React App. The most popular State Management Tool for React is React-Redux.
Typically a store consists of three major parts: Actions, Reducers and Types.
I would like to discuss two ways you can structure your store folder. There might be other ways you can structure your store folder but I think these two ways are the most efficient:

