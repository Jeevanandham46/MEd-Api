var express = require('express')
var app = express()
var fs = require('fs')
const cors = require ('cors')

app.use(express.json())
app.use(express.urlencoded({
    extended:true 
}))

app.use(cors({
    origin:'*'
}))

const filePath = 'E://Medicine//API//'

app.get('/data',function(req,res){
    fs.readFile(filePath+'store.json','utf8',function(err,data){
        if(err)
        throw err;
        let dataParse = JSON.parse(data)
        res.send(dataParse)
    })
})

app.get('/bot',function(req,res){
    fs.readFile(filePath+'chatbot.json','utf8',function(err,data){
        if(err)
        throw err;
        let dataParse = JSON.parse(data)
        res.send(dataParse)
    })
})

app.post('/login',function(req,res){
    console.log(req.body)
    var allData
    fs.readFile(filePath+'login.json','utf8',function(err,data){
        if(!data || err){
            allData = [req.body]
        }else{  
        allData = JSON.parse(data)
        for(x of allData){
            if(x.email == req.body.email && x.password == req.body.password){
                console.log('success')

                res.send(x)
                
            }
        }
        }
    })
})
app.post('/register',function(req,res){
    console.log(req.body)
    var allData
    fs.readFile(filePath+'login.json','utf8',function(err,data){
        
    if(!data || err){
        allData = [req.body]
        
    }else{
        allData = JSON.parse(data)
        for(x of allData){
            if(x.email == req.body.email){
                res.status(404).send(x)
            }else{
                res.status(200).send(req.body)
            }
        }
        allData.push(req.body)
    }

var jsonData = JSON.stringify(allData)
    fs.writeFile(filePath+'login.json',jsonData,function(err,data){
    if(err){
        res.send(err)
    }    })

    })
})

app.post('/bill',function(req,res){
    console.log(req.body)
    var allData
    fs.readFile(filePath+'bill.json','utf8',function(err,data){
        
    if(!data || err){
        allData = [req.body]
        
    }else{
        allData = JSON.parse(data)
        allData.push(req.body)
    }

var jsonData = JSON.stringify(allData)
    fs.writeFile(filePath+'bill.json',jsonData,function(err,data){
    if(err){
        res.send(err)
    }
    res.send('success')
    })

    })
})

app.get('/getbill',function(req,res){
    console.log(req.body)
    var allData
    fs.readFile(filePath+'bill.json','utf8',function(err,data){
        if(!data || err){
            allData = [req.body]
        }else{  
        allData = JSON.parse(data)
            res.send(allData)
        }
    })
})

app.listen(1000)