
<header>
  <h2> Comentarios </h2>
</header>

<% for (var i in comments) { %>
  <article>
     <header>
        <em> <%= comments[i].author && comments[i].author.name || "Sin autor" %> </em>
        <p>
          <%= comments[i].updatedAt.toLocaleDateString() %>
        </p>
   </header>
     
     <p>
       <%- escapeText(comments[i].body) %>
     </p>

     <footer>

      <% if (session.user && session.user.id == comments[i].authorId) {%>

        <form method='post' action='/posts/<%= post.id %>/comments/<%= comments[i].id %>'>
          <input type='hidden' name='_method' value='delete'>
          <a href="/posts/<%= post.id %>/comments/<%= comments[i].id %>/edit"> Editar </a>
          <a href="" onclick="submit();return false"> Borrar </a>
        </form>

      <% } %>

     </footer>
  </article>
<% }; %>

<footer>
  <nav>
<!--
    <a href="/posts/<%= post.id %>/comments/new"> Crear nuevo Comentario </a>
-->
  </nav>
</footer>

