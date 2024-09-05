import {StatusCodes} from 'http-status-codes';
import pino from 'pino';

const logger = pino();

import userServices from '../services/user.service';

const STATUS={
    SUCCESS:'ok',
    FAILURE:'NO'
}

/**
 * @param req
 * @param res
 * @returns {*}
 */

const getAllUsers=(req,res)=>{
    const users = userServices.getAllUsers();
    if(users.length){
        return res.status(StatusCodes.OK).send(users);
    }
    return res.status(StatusCodes.NOT_FOUND).send({
        status:STATUS.FAILURE,
        message:`No users found`
    });
};

/**
 * Retrieve a user
 * @param req
 * @param res
 * @returns {*}
 */

const getUser=(req,res)=>{
    const id=parseInt(req.params.id,10);
    const user = userServices.getUser(id);
    if(user){
        logger.info(`Retrieving ${id} user`)
        return res.status(StatusCodes.OK).send(
            {
                status:STATUS.SUCCESS,
                user
            }  
        );
    }
    return res.status(StatusCodes.NOT_FOUND).send({
        status:STATUS.FAILURE,
        data:`User ${id} is not found`
    });
};

/**
 * Add a user.
 * 
 * @param req
 * @param res
 * @returns {*}
 */

const addUser = (req,res)=>{
    //const data=[];
    const {body:user}=req;
    const addedUser=userServices.addUser(user);
    /*if(!user.name){
        return res.status(StatusCodes.BAD_REQUEST).send({
            status:STATUS.FAILURE,
            message:"name is required"});
    }*/
    //data.push(req.body);
    logger.info('Creating a user')
    res.status(StatusCodes.CREATED).send({
        status:STATUS.SUCCESS,
        user:addedUser,
    });
};

/**
 * Update a user.
 * 
 * @param req
 * @param res
 * @returns {*}
 */

const updateUser =(req,res)=>{
const {body:user}=req;
const id=parseInt(req.params.id,10)
const updatedUser=userServices.updateUser(id,user);
if (updatedUser){
    return res.status(StatusCodes.OK).send({
        status:STATUS.SUCCESS,
        user:updatedUser,   
});
    logger.info(`Updating ${id} user`)
}
else{
    return res.status(StatusCodes.NOT_FOUND).send({
        status:STATUS.FAILURE,
        message:`User ${id} is not found`
    });
}
}

/**
 * Remove a user.
 * 
 * @param req
 * @param res
 * @returns {*}
 */

const removeUser=(req,res)=>{
    const { params }= req;
    const id=parseInt(params.id);
    const user = userServices.getUser(id);
    if(user){
        userServices.removeUser(id);
        res.status(StatusCodes.OK).send({
            status:STATUS.SUCCESS,
            message:`User ${id} has been deleted`
        });
        logger.info(`Removing ${id} user`)
    }
    else{
        return res.status(StatusCodes.NOT_FOUND).send({
            status:STATUS.FAILURE,
            message:`User ${id} hasn't been found`
        });
    }
    /*let response;
    if(status===true){
        response={
            status:STATUS.SUCCESS,
            message:`User ${id} has been deleted`
        };
    res.status(StatusCodes.OK).send(response);
    }
    else{
        response={
            status:STATUS.FAILURE,
            message:`User ${id} hasn't been deleted`
        };
    }*/
};

export default{
    getAllUsers,
    getUser,
    addUser,
    updateUser,
    removeUser
}

