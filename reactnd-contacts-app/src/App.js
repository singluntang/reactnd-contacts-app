import React, { Component } from 'react';
import ListContacts from './ListContacts';
import CreateContact from './CreateContact';
import * as ContactsAPI from './utils/ContactsAPI'
import { Route } from 'react-router-dom'
import { createBrowserHistory } from 'history';

class App extends Component {

  state = {
    contacts : [],
    screen: 'list'
  }

  componentDidMount(){
    ContactsAPI.getAll()
      .then((contacts) => {
          this.setState(() => ({
            contacts            
          }))
      })
    
  }

  createContact = (contact) => {
    ContactsAPI.create(contact)
      .then((contact => {
          this.setState((currentState) => {
            currentState.contacts.concat([contact])
          })
      }))
   }

  removeContact = (contacts) => {
    this.setState((currentStates)=>(
      {        
      contacts: currentStates.contacts.filter((c)=>{
        return c.id !== contacts.id
      })
    }))
    ContactsAPI.remove(contacts);
  }

  render() {
    const contactHistory = createBrowserHistory({
      forceRefresh: true
    });    
    return (
        <div>
             <Route exact path='/' render={() => (
              <ListContacts
              contacts={this.state.contacts}
              onDeleteContact={this.removeContact}/>
             )} />            
             <Route path='/create' render={() => (
              <CreateContact
                onCreateContact={(contact) => {
                  this.createContact(contact)
                  contactHistory.push('/')
                }}
              />
            )} />                                
        </div>
    )
  }
}

export default App;