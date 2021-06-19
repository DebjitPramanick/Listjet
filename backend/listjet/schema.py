import graphene
from .models import ListItem
from graphene_django import DjangoObjectType, DjangoListField

class ItemType(DjangoObjectType):
    class Meta:
        model = ListItem
        fields = ('id', 'title', 'date')

class Query(graphene.ObjectType):
    items = DjangoListField(ItemType, id=graphene.Int())
    def resolve(self, info, id=None):
        if id:
            return ListItem.objects.filter(id = id)
        return ListItem.objects.all()

class CreateItem(graphene.Mutation):
    item = graphene.Field(ItemType)
    class Arguments:
        title = graphene.String(required=True)
    def mutate(self, info, title):
        item = ListItem(title=title)
        item.save()
        return CreateItem(item=item)


class UpdateItem(graphene.Mutation):
    item = graphene.Field(ItemType)
    class Arguments:
        id = graphene.Int(required=True)
        title = graphene.String(required=True)
    def mutate(self, info, title, id):
        item = ListItem.objects.get(id=id)
        item.title = title
        item.save()
        return UpdateItem(item=item)


class DeleteItem(graphene.Mutation):
    message = graphene.String()
    class Arguments:
        id = graphene.Int(required=True)
    def mutate(self, info, id):
        item = ListItem.objects.get(id=id)
        item.delete()
        return DeleteItem(message= "Item deleted.")


class Mutation(graphene.ObjectType):
    createItem = CreateItem.Field()
    updateItem = UpdateItem.Field()
    deleteItem = DeleteItem.Field()