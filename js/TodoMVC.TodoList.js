TodoMVC.module('TodoList', function(TodoList, App, Backbone, Marionette, $, _) {

  TodoList.Router = Marionette.AppRouter.extend({

    appRoutes: {

      '*filter': 'filterItems'
    }
  });

  TodoList.Controller = function() {

    this.todoList = new App.Todos.TodoList();
  };

  _.extend(TodoList.Controller.prototype, {

    start: function() {

      this.showHeader( this.todoList );
      this.showFooter( this.todoList );
      this.showTodoList( this.todoList );

      App.bindTo( this.todoList, 'reset add remove', this.toggleFooter, this);
      this.todoList.fetch();
    },

    showHeader: function(todoList) {

      var header = new App.Layout.Header({
        collection: todoList
      });

      App.header.show(header);

    },

    showFooter: function(todoList) {

      var footer = new App.Layout.Footer({

        collection: todoList
      });

      App.footer.show(footer);
    },

    showTodoList: function(todoList) {

      App.main.show( new TodoList.Views.ListViews({
        
        collection: todoList
      }));
    },

    toggleFooter: function() {

      App.footer.$el.toggle( this.todoList.length);

    },

    filterItems: function() {

      App.vent.trigger('todoList:filter', filter.trim() || '');
    }
  });

  TodoList.addInitializer( function() {

    var controller = new TodoList.Controller();

    new TodoList.Router({
      controller: controller
    });

    controller.start();
  });
});