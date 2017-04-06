from __future__ import print_function
import boto3
import json
import uuid
from datetime import datetime

print('Loading function')


def handler(event, context):
    """Provide an event that contains the following keys:

      - operation: one of the operations in the operations dict below
      - tableName: required for operations that interact with DynamoDB
      - payload: a parameter to pass to the operation being performed
    """
    print("Received event: " + json.dumps(event, indent=2))

    operation = event['operation']

    if 'tableName' in event:
        dynamo = boto3.resource('dynamodb').Table(event['tableName'])

    if operation == 'create':
        event['payload']['Item']['UUID'] = str(uuid.uuid4())

    if 'timestampField' in event:
        if operation == 'create':
            event['payload']['Item'][event['timestampField']] = datetime.now().strftime("%Y-%m-%d,%H:%M")
        elif operation == 'update':
            event['payload'].update({'AttributeUpdates': { event['timestampField']: {'Value': datetime.now().strftime("%Y-%m-%d,%H:%M")}}})

    operations = {
        'create': lambda x: dynamo.put_item(**x),
        'read': lambda x: dynamo.get_item(**x),
        'update': lambda x: dynamo.update_item(**x),
        'delete': lambda x: dynamo.delete_item(**x),
        'list': lambda x: dynamo.scan(**x),
        'echo': lambda x: x,
        'ping': lambda x: 'pong'
    }

    if operation in operations:
        return operations[operation](event.get('payload'))
    else:
        raise ValueError('Unrecognized operation "{}"'.format(operation))
