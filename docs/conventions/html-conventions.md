## [HTML code conventions](https://docs.fdnd.nl/conventies.html#html-conventies)

### General conventions for writing HTML:
- Use one tab indentation
- Use double quote when declaring attributes
- Breathing room inbetween elements. Make sure not everything is cluttered together. 

```html
 <article>
   <h2></h2>
   <p></p>

   <ul>
     <li></li>
     <li></li>
     <li></li>
     <li></li>
   </ul>

   <picture>
     <source srcset="blabla.webp" type="image/webp"
     <img src="blabla.jpg" width="350" height="575"
   </picture>
 </article>
```

### [Use Semantic HTML](https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html). 

Using semantic HTML gives the content in an element a specific value. This let's the search engine and screen reader know the exact purpose of a specific element.

Example: 
```HTML
 <h1>This is the most important heading</h1>

 <article>
  <h2>Now this heading is slightly less important than a heading one</h2>

  <p>Text is an important and crucial part of the web, duh.</p>

  <picture>
    <source srcset="blabla.webp" type="image/webp"
    <img src="blabla.jpg" width="350" height="575"
  </picture>
</article
```
 ### Use Built in features from HTML
HTML already has a few built in features to be used in the making of websites. A few important features are the Form, Time and Picture elements. These elements already have a built in purpose to help you with building your website.

Example:
```html
 <p>This form needs to be submitted on <time datetime="2026-07-07">July 7th</time></p> 
 <form action="" method="post"
   
   <input type="checkbox" value="Pancakes"/>
   <input type="checkbox" value="Waffles"/>
  
   <input type="submit" value="Submit your answer!"/>
 </form>
```

### Dont nest elements too deep 
If you find yourself making too many nested elements inside the page you either need to condense the content or link to another page with more information on this subject. Also use the `details` and `summary` for more condensed pieces of info that can be accessible if more context is needed.

```html
  <details>
    <summary>We need semantic HTML for accessibility, but also performance and SEO</summary>

    <p>
       Because when you use semantic HTML you'll help search engines 
       with indexing your website correctly and you'll be 
       up higher in the charts by just doing what's right
    </p>
  </details>
```
