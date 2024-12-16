interface IError extends Error {
  status: number;
}

interface IListMessage {
  [key: number]: string;
}

const listMessage: IListMessage = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};

const HttpError = (
  status: number,
  message: string = listMessage[status]
): IError => {
  const error = new Error(message) as IError;
  error.status = status;
  return error;
};

export default HttpError;
