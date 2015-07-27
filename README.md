# Gridify
Cascading grid layout ([edo.io](http://www.edo.io), [Google Keep](https://keep.google.com/), [Pinterest](https://www.pinterest.com/) style) for [angularjs](https://angularjs.org/)-based application.

##Usage

1. Add `jj.gridify` module to your app's module dependencies.
2. Include dependencies in your html
3. Use directives `gridify` on the parent and `gridify-item` on children items

<br/>
##Usage example

```html
<ul gridify={listToWatch : elementsList}>
    <li gridify-item="element" ng-repeat="element in elementsList">
    </li>
</ul>
```

In case of dynamic list, you have to: 
1. Add `gridify` directive to the parent element and pass as attribute an object with key `listToWatch` and the list you want to watch as value. 
2. Add `gridify-item` to the child element and pass as attribute the property of the ng-repeat object

Anytime a new item is appended or removed from the list, all items will automatically re-position according to the new list length.

<br/>
##Gridify options

### `maxColumns`

(Default: `null`)

You can specify a **fixed columns number** in order to avoid the list layout adapting to the window size. By default, the list will fill all window space considering single items width and margin.

**n.b**. The script is assuming all children items having the **same width and margin**.

*Example:*

```html
<ul gridify={listToWatch : elementsList, maxColumns : 3}>
    <li gridify-item="element" ng-repeat="element in elementsList">
    </li>
</ul>
```
<br/>

### `containerId`

(Default: `null`)

In case no fixed columns number is specified, `gridify` will automatically adapt the layout to the window. If want the layout to adapt to a specific parent div, pass to the `gridify` attribute object the id of the div as value. This will force the grid to fill the parent and not the entire window.

*Example:*

```html
<div id="listParent">
  <ul gridify={listToWatch : elementsList, containerId: 'listParent'}>
      <li gridify-item="element" ng-repeat="element in elementsList">
      </li>
  </ul>
<div>
```
<br/>

### `newItemClass`

(Default: `null`)

Specify a **custom css class** to add to every new element appended to the list.

*Example:*

```html
<style>

  .fadeIn{
    animation: simpleFadeIn 1s linear;  
  }
  
  @keyframes simpleFadeIn {
		from {opacity: 0;}
		to {opacity: 1;}
	}
  
</style>

<ul gridify={listToWatch : elementsList, newItemClass : 'fadeIn'}>
    <li gridify-item="element" ng-repeat="element in elementsList">
    </li>
</ul>
```
<br/>

### `responsive`

(Default: `true`)

The layout will automatically adapt when browser window is resizing. Set `false` to disable it.

**n.b**. Option `maxColumns`, if specified, takes **priority** over `responsive` value.


*Example:*

```html
<ul gridify={listToWatch : elementsList, responsive: false}>
    <li gridify-item="element" ng-repeat="element in elementsList">
    </li>
</ul>
```
<br/>
## Events

if you want to force the grid and the items to re-position, you can broadcast the following event:
- ``gridify.re-render``
This can be useful as a callback when the height of a child item changes. If the ng-repeat `index` of the item is passed to the broadcast, you can contain the re-position only to the items on the same column, otherwise by default, it will re-position all items in the grid.

*Example:*

```javascript
$rootScope.$broadcast('gridify.re-render', {index : scope.$index});
```

<br/>

## Dependencies

- [angularjs](https://angularjs.org/)
- [jquery](https://jquery.com/)

<br/>

## License

MIT


