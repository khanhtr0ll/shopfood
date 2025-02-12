const { model } = require('mongoose');
const itemModel = require('../models/item')
const functionItem = {

    addItem: async (req, res) => {
        try {
            // Khai báo biến newItem
            let newItem;
    
            // Tạo đối tượng itemModel tùy theo giá trị của req.body.a
            if (req.body.a == 1) {
                newItem = new itemModel({
                    itemName: req.body.name,
                    Money: req.body.price,
                    idItem: req.body.idItem,
                    addressseller: req.body.account,
                    addressbuyer: 0,
                    Type: req.body.a
                });
            } else {
                newItem = new itemModel({
                    itemName: req.body.name,
                    Money: req.body.price,
                    Time:req.body.time,
                    idItem: req.body.idItem,
                    addressseller: req.body.account,
                    addressbuyer: 0,
                    Type: req.body.a
                });
            }
    
            // Lưu đối tượng mới vào cơ sở dữ liệu
            const savedItem = await newItem.save(); // Chờ đợi kết quả lưu
    
            // Trả về phản hồi thành công
            res.status(201).json(savedItem); // Trả về đối tượng đã lưu
        } catch (error) {
            console.error("Lỗi khi lưu item:", error); // In ra lỗi trong console
            res.status(500).json("Lỗi server");
        }
    },
    
    loadItem: async (req, res) => {
        try {
            const data = await itemModel.find({}); // Tìm tất cả items
            res.status(200).json(data); // Trả về dữ liệu dưới dạng JSON
        } catch (error) {
            console.error('Error loading items:', error);
            res.status(500).json("Lỗi server");
        }
    },

    loadItemOne: async (req, res) => {
        try {
            const item = await itemModel.findById(req.params.id); // Tìm item bằng ID
            
            if (!item) {
                return res.status(404).json({ message: "Item not found" }); // Trả về 404 nếu không tìm thấy
            }
    
            res.status(200).json(item); // Trả về item nếu tìm thấy
        } catch (error) {
            console.error(error); // Ghi log lỗi để kiểm tra
            res.status(500).json({ message: "Lỗi server" }); // Trả về lỗi server
        }
    },
    loadManBuy: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await itemModel.find({ addressbuyer: id });
    
            if (!data.length) {
                return res.status(404).json({ message: "Không tìm thấy dữ liệu" });
            }
    
            res.json(data); // Trả về dữ liệu dưới dạng JSON
        } catch (error) {
            console.error(error); // Ghi log lỗi
            res.status(500).json({ message: "Lỗi server" });
        }
    },
    buyItem: async (req, res) => {
        try {
            
            // Cập nhật nhiều trường cùng một lúc
            const result = await itemModel.findOneAndUpdate(
                { _id: req.body.a }, // Điều kiện tìm kiếm
                {
                    $set: {
                        addressbuyer: req.body.account,
                        statusItem: "1"
                    }
                }, // Cập nhật nhiều trường
                { new: true } // Trả về tài liệu mới sau khi cập nhật
            );

            console.log('Sản phẩm sau khi cập nhật:', result);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    }, 
    buyItem1: async (req, res) => {
        try {
            
            // Cập nhật nhiều trường cùng một lúc
            const result = await itemModel.findOneAndUpdate(
                { _id: req.body.a }, // Điều kiện tìm kiếm
                {
                    $set: {
                        
                        statusItem: "2"
                    }
                }, // Cập nhật nhiều trường
                { new: true } // Trả về tài liệu mới sau khi cập nhật
            );

            console.log('Sản phẩm sau khi cập nhật:', result);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    },loadItemAuc: async (req, res) => {
        try {

            itemModel.findById(req.params.id, (error, data) => {
                res.render("daugia", { item: data })
            });

            // res.redirect("/")
        } catch (error) {
            res.status(500).json("loi server")
        }
    }, RaGia: async (req, res) => {
        try {
            console.log(req.body.priceElement);
            // Cập nhật nhiều trường cùng một lúc
            const result = await itemModel.findOneAndUpdate(
                { _id: req.body.a }, // Điều kiện tìm kiếm
                {
                    $set: {
                        addressbuyer: req.body.account,
                        Money: req.body.price
                    },
                    $inc: {
                        Time: req.body.timeplus // Tăng giá trị của trường Time
                    }
                }, // Cập nhật nhiều trường
                { new: true } // Trả về tài liệu mới sau khi cập nhật
            );

            console.log('Sản phẩm sau khi cập nhật:', result);
        } catch (error) {
            console.error('Lỗi:', error);
        }
    },


}
module.exports = functionItem;