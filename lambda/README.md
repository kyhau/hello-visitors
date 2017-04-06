# Sample Lambda Function `VisitorsDynamoDBClient` Test Events

## signin

```
{
  "operation": "create",
  "tableName": "Visitors",
  "timestampField": "Signin",
  "payload": {
    "Item": {
      "CompanyName": "Company A",
      "FullName": "John Smith"
    }
  }
}
```

## signout

```
{
  "operation": "update",
  "tableName": "Visitors",
  "timestampField": "Signout",
  "payload": {
    "Key": {
      "UUIS": ""
    }
  }
}
```

## list

```
{
  "operation": "list",
  "tableName": "Visitors",
  "payload": {
  }
}
```

## list_not_signout

```
{
  "operation": "list",
  "tableName": "Visitors",
  "payload": {
    "FilterExpression": "attribute_not_exists(SignOut)"
  }
}
```
