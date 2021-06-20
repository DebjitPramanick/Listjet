import { gql } from "@apollo/client";


export const GET_ITEMS = gql`
{
    items{
      title
      id
    }
}
`

export const UPDATE_ITEM = gql`
mutation($id: Int!, $title: String!){
    updateItem(id: $id, title: $title){
        item{
          title
          id
        }
    }
  }
`

export const DELETE_ITEM = gql`
mutation($id: Int!){
    deleteItem(id: $id){
      message
    }
  }
`

export const CREATE_ITEM = gql`
mutation($title: String!){
    createItem(title: $title){
      item{
        title,
        id
      }
    }
  }
`