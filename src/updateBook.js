const AWS = require("aws-sdk");

exports.updateBook = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { BookID } = event.pathParameters;  
  const { title, author, publishedYear, genre } = JSON.parse(event.body);

  if (!title || !author || !publishedYear || !genre) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Todos los campos (title, author, publishedYear, genre) son obligatorios.",
      }),
    };
  }
  try {

    const result = await dynamodb.update({
      TableName: "BooksTable", 
      Key: { BookID },  
      UpdateExpression: "set Title = :title, Author = :author, PublishedYear = :publishedYear, Genre = :genre",  
      ExpressionAttributeValues: {
        ":title": title,
        ":author": author,
        ":publishedYear": publishedYear,  
        ":genre": genre,
      },
      ReturnValues: "ALL_NEW",  
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Reserva con ID ${BookID} actualizado exitosamente`,
        updatedBook: result.Attributes,  
      }),
    };
  } catch (error) {
    console.error("Error al actualizar el libro:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Error al actualizar el libro con ID ${BookID}`,
        error: error.message,
      }),
    };
  }
};
