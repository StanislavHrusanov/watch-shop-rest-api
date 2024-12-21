# watch-shop-rest-api

| Contents
|---
| - [Usage](#usage)
| - [Authentication](#authentication)
| - [Watch Service](#watch-service)
| - [MyProfile Service](#myprofile-service)
| - [Order Service](#order-service)
| - [Dependencies](#dependencies)

## Usage

This is a **REST service**, created by Express and used for online watch store.
To start the server just open the terminal and enter `npm install` to install the dependencies and `npm start` to start the server. The server will listen on `http://localhost:3003`.

#### CRUD Operations

 Supported requests are `GET`, `POST`, `PUT`, `PATCH`, `DELETE`

## Authentication

#### Register

Create a new user by sending a `POST` request to `/auth/register` with properties `firstName`, `lastName`,`password`,`repass`,`email`,`address` and `phoneNumber`. The service automatically creates a session and returns an object with `_id`, `email`,`isAdmin` and  `accessToken`.

#### Login
Login by sending a `POST` request with `email` and `password` to `/auth/login`. The service automatically creates a session and returns an object with `_id`, `email`,`isAdmin` and  `accessToken`.

#### Logout
Send an authorized `GET` request to `/auth/logout`.

#### Authorized Requests
To make an authorized request, add the following header, where `{token}` is the access token, returned by the service upon successful login or registration:
```
x-authorization: {token}
```

## Watch Service

#### Add watch
Crating a new watch by sending a `POST` authorized request to `/watches` with properties `title`, `brand`, `model`, `imageUrl`, `price`, `type`, `movement`, `glass`, `waterResistance`, `diameter`, `bodyMaterial`, `strapMaterial`, `warrantyInYears`, `quantity` and `description`. The service create a new watch and returns it like an object. Only admin can add new watches!!!

#### Get all watches 

Get all watches collection sending a `GET` request to `/watches`. The service returns an array with all watches.

#### Get all watches filtered, sorted and paginated

Get all watches filtered, sorted and paginated  sending a `GET` request to `/watches/paginated?filteredByCriteria={filterCriteria}&sortedByCriteria={sortCriteria}&page={page}&limit={limit}`, where {filterCriteria} can be `all`, `men` and `women`, {sortCriteria} can be `newest`, `lowestPrice` and `highestPrice`, {page} is current page you want to get, and {limit} is the number of watches on page. The service returns an array with watches on current page filtered, sorted and limited by criterias.

#### Get watches count for pagination

Get watches count sending a `GET` request to `/watches/count?type={type}&brand={brand}&searched={searched}`, where {type} can be `all`, `men` and `women`, {brand} can be `all`, `Casio`, `Certina`, `Citizen`, `Diesel`, `Festina`, `Fossil`, `Invicta`, `Jaques Lemans`, `Luminox`, `Orient`, `Police`, `Sector`, `Seiko`, `Timex`, `Tissot`, `Victorinox`, `Vostok Europe`, and {searched} can be `''` for all or `string` which is contained in watch title. The server returns the count of watches corresponding the specified criterias.

#### Get searched watches

Get all watches corresponding the specified criteria for search, filtered, sorted and paginated sending `GET` request to `/watches/search?searched={searched}&filteredByCriteria={filterCriteria}&sortedByCriteria={sortCriteria}&page={page}&limit={limit}`, where {searched} is `string` which is contained in watch title, {filterCriteria} can be `all`, `men` and `women`, {sortCriteria} can be `newest`, `lowestPrice` and `highestPrice`, {page} is current page you want to get, and {limit} is the number of watches on page. The service returns an array with watches corresponding the specified criterias.

#### Get simillar watches 

Get four simillar watches sending `GET` request to `/watches/similarWatches?brand={brand}&watchId={watchId}`. Server returns array with maximum four watches witch are with brand same like {brand} and _id different than {watchId}.

#### Get brands logo

Get all brands logo sending `GET` request to `/watches/brandsLogo`. Server returns array with objects with dependencies `brand` and `imageUrl` sorted alphabetically.

#### Get all watches from specified brand, filtered, sorted and paginated

Get all watches corresponding the specified criteria for brand, filtered, sorted and paginated sending `GET` request to `/watches/brands?brand={brand}&type={type}&sortedByCriteria={sortCriteria}&page={page}&limit={limit}`, where {brand} can be `Casio`, `Certina`, `Citizen`, `Diesel`, `Festina`, `Fossil`, `Invicta`, `Jaques Lemans`, `Luminox`, `Orient`, `Police`, `Sector`, `Seiko`, `Timex`, `Tissot`, `Victorinox`, `Vostok Europe`, {type} can be `all`, `men` and `women`, {sortCriteria} can be `newest`, `lowestPrice` and `highestPrice`, {page} is current page you want to get, and {limit} is the number of watches on page. The service returns an array with watches corresponding the specified criterias.

#### Get watch details

Get watch details sending `GET` request to `/watches/{watchId}`, where {watchId} is the _id of watch you want to get. The service returns an object with watch details.

#### Edit watch

Edit watch details sending `PUT` authorized request to `/watches/{watchId}`, where {watchId} is the _id of watch you want to edit and object with new (edited) data of watch. Only admin can edit watches!!!

#### Delete watch

Delete watch sending `DELETE` authorized request to `/watches/{watchId}`, where {watchId} is the _id of watch you want to delete. Only admin can delete watches!!!

## MyProfile Service     

#### Get user info

Get logged in user info sending authorized request to `/myProfile/userInfo?userId={userId}`, where {userId} is the _id of logged in user. The service returns an object with `_id`, `firstName`, `lastName`, `password:hashedPassword`, `email`, `address`, `phoneNumber`, `isAdmin`, `wishlist` and `cart`.

#### Update wishlist

Update wishlist sending `PUT` authorized request to `/myProfile/wishlist/update?userId={userId}&watchId={watchId}`, where {userId} is the _id of logged in user, {watchId} is the _id of watch user want to add to wishlist if it is not there yet or remove if it is already there. The service returns array with watches which is in wishlist of user. Only notAdmin can add or remove from wishlist!

#### Remove from wishlist

Remove watch from wishlist sending `PUT` authorized request to `/myProfile/wishlist/remove?userId={userId}&watchId={watchId}`, where {userId} is the _id of logged in user, {watchId} is the _id of watch user want to remove from his wishlist. The service returns array with watches which is in wishlist of user. Only notAdmin can add or remove from wishlist!

#### Add to cart

Add watch to cart sending `PUT` authorized request to `/myProfile/cart/add?userId={userId}&watchId={watchId}&qty={qty}`, where {userId} is the _id of logged in user, {watchId} is the _id of watch user want to add to cart and {qty} is the quantity of watches which user want to add to cart. The service returns array with objects with dependencies `watch` and `qty`. Only notAdmin can add watches to cart!

#### Remove from cart

Remove watch from cart sending `PUT` authorized request to `/myProfile/cart/remove?userId={userId}&watchId={watchId}`, where {userId} is the _id of logged in user, {watchId} is the _id of watch user want to remove from cart. The service returns array with objects with dependencies `watch` and `qty`. Only notAdmin can remove watches from cart!

#### Decrease quantity

Decrease quantity of specific watch in cart sending `PUT` authorized request to `/myProfile/cart/decreaseQty?userId={userId}&watchId={watchId}&qty={qty}`, where {userId} is the _id of logged in user, {watchId} is the _id of watch user want to decrease quantity from cart and {qty} is the quantity of watches which user want to decrease. The service returns array with objects with dependencies `watch` and `qty`. Only notAdmin can remove watches from cart!

#### Update user cart 

Update user cart sending `PUT` authorized request to `/myProfile/userInfo/updateCart?userId={userId}`, where {userId} is the _id of logged in user. This request is needed to decrease automatically quantity of any of watches in cart if other user has bought one of them and quantity of that watch is lower than quantity needed in user cart. The service returns object with updated user's info. Only for notAdmin users!

#### Clean user cart 

Clean user cart sending `PUT` authorized request to `/myProfile/userInfo/cleanCart?userId={userId}`, where {userId} is _id of logged in user. This request is needed when user confirm his order and cart have to be cleaned. The service returns object with updated user's info. Only for notAdmin users!


## Order Service

#### Create new order

Create new order sending `POST` authorized request to `/orders` with properties `buyer` (_id of logged in user), `items` (array contains objects with properties `_id` (_id of the watch), `title` (title of the watch), `price` (price of the watch), `quantity` (wished quantity) and `imageUrl` (imageUrl of the watch)) and `totalPrice` (total price of  the purchase). The service updates quantity of watches in database and returns object with created order's data. Only for notAdmin users!

#### Get all orders

Get all orders sending `GET` authorized request to `/orders`. The server returns array with all orders. Only admin can get all orders!

#### Get orders created by specific user

Get orders created by specific user sending `GET` authorized request to `/orders/specificUserOrders?userId={userId}`, where {userId} is _id of logged in user. The service returns array with orders created by logged in user.

#### Change order status

Change order status sending `PUT` authorized request to `/orders/changeOrderStatus?orderId={orderId}`, where {orderId} is _id of order which status you want to change. The default status of every order is `Pending`. When admin has processed the order, the order status can be changed to `Sent`. The service returns the changed order status. Only admin can change an order status. 

## Dependencies

- <i>express</i>
- <i>mongoose</i>
- <i>bcrypt</i>
- <i>jsonwebtoken</i>
- <i>cors</i>

<h2>Hosted at: https://yellow-rattlesnake-tam.cyclic.app</h2>