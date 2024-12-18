
Notes:
1. how to - clean up state on function component destruction [here](#how-to---clean-up-state-on-function-component-destruction)


# How To - Handle Component Load

```tsx
function MyComponent(props) {
  const params = useParams<{ organisation: string }>();
  const orgId = params.organisation;

  let subscription: Subscription = null;
  useEffect(() => {
    if (orgId) {
      loadOrg();
      // todo: set the logged out org state here?
    }
  }, []);
}
```


# How To - Clean Up state on Function Component Destruction

https://sites.google.com/d/1vwFq2fEKzr0qMdTsfoLgv9Ckx5b04GvD/p/1dk-pdLX7Ci8giI_dLB4d6BVR3aOOZ2J8/edit

Why:
* sometimes useEffect creates some state (such as an observable subscription), that needs to be cleaned up

When:
* our "clean up" is called before any subsequent useEffect invocation.  Remember, useEffect will fire based on its dependency array
our "clean up" is also called on desruction of the function component

How:
```tsx
function MyComponent(props) {
  let subscription: Subscription = null;
  useEffect(() => {
   // Side-effect...
   subscription = values$.subscribe();

   return function cleanup() {
     // Side-effect cleanup...
     subscription.unsubscribe();
   };
  }, dependencies);
}
```

# useSelector()
```tsx
  const user = useSelector((state: Store) => state?.userSession?.user, (prev, next) => {
    // only execute hook when email has changed value
    return prev?.email === next?.email;
  });
  
```
