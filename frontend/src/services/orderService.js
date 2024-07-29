import axios from 'axios';

export const createOrder = async order => {
  try {
    const { data } = axios.post('/api/orders/create', order,{
    headers: {
      access_token: JSON.parse(localStorage.getItem("user"))["token"],

    },
  });
     return data; 
    }catch (error) {
      console.log(error);
    }
};

export const getNewOrderForCurrentUser = async () => {
  try {
    const { data } = await axios.get('/api/orders/newOrderForCurrentUser', {
      headers: {
        access_token: JSON.parse(localStorage.getItem("user"))["token"],
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const pay = async paymentId => {
  try {
    const { data } = await axios.put('/api/orders/pay', 
      { paymentId },
      {
        headers: {
          access_token: JSON.parse(localStorage.getItem("user"))["token"],
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const trackOrderById = async orderId => {
  try {
    const { data } = await axios.get('/api/orders/track/' + orderId, {
      headers: {
        access_token: JSON.parse(localStorage.getItem("user"))["token"],
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getAll = async state => {
  try {
    const { data } = await axios.get(`/api/orders/${state ?? ''}`, {
      headers: {
        access_token: JSON.parse(localStorage.getItem("user"))["token"],
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllStatus = async () => {
  try {
    const { data } = await axios.get(`/api/orders/allstatus`, {
      headers: {
        access_token: JSON.parse(localStorage.getItem("user"))["token"],
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};