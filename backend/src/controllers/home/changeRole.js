const { SQL } = require("../../config");
const connection = require("../../database/connect");

exports.requestNewRole = (req, res) => {
    let newValue = {
        role: req.body.role,
        form: JSON.stringify(req.body.form),
        status: "pending",
    };

    connection.query(
        `SELECT username FROM ${SQL.tables.users} WHERE id=${req.user.id}`,
        (error, data) => {
            if (error || data.length === 0) {
                res.json({
                    success: false,
                    message: "User not found or Internal server error",
                });
            } else {
                newValue.username = data[0].username;
                connection.query(
                    `SELECT * FROM ${SQL.tables.requestNewRole} WHERE username="${newValue.username}"`,
                    (error, data) => {
                        if (
                            !error &&
                            (data.length === 0 || data[0].status !== "pending")
                        ) {
                            connection.query(
                                `INSERT INTO ${SQL.tables.requestNewRole} SET ?`,
                                newValue,
                                (error) => {
                                    if (error) {
                                        res.json({
                                            success: false,
                                            message: "Internal server error",
                                        });
                                    } else {
                                        res.json({
                                            success: true,
                                            message:
                                                "Your request has been register for new role, your role will change once admin will approve your request",
                                        });
                                    }
                                }
                            );
                        } else {
                            res.json({
                                success: false,
                                message:
                                    "Cannot make same request twice or you have pending request",
                            });
                        }
                    }
                );
            }
        }
    );
};

exports.changeRole = (req, res) => {
    let username = req.body.username;

    let roles = {
        role: req.body.role,
    };

    if (roles.role !== "admin" && req.user.role == "admin") {
        connection.query(
            `SELECT t1.role_id, t2.role FROM ${SQL.tables.users} t1 INNER JOIN ${SQL.tables.roles} t2 ON t1.role_id = t2.id WHERE t1.username="${username}"`,
            (error, data) => {
                if (!error && data.length > 0 && data[0].role !== "admin") {
                    const register_id = data[0].role_id;
                    const role = data[0].role;
                    connection.query(
                        `SELECT id,role FROM ${SQL.tables.roles} WHERE role="${roles.role}"`,
                        (error, data) => {
                            if (error || data.length === 0) {
                                connection.query(
                                    `UPDATE ${SQL.tables.requestNewRole} SET status="fail" WHERE username="${username}"`
                                );
                                res.json({
                                    success: false,
                                    message: "Role does not exists",
                                });
                            } else if (register_id === data[0].id) {
                                connection.query(
                                    `UPDATE ${SQL.tables.requestNewRole} SET status="fail" WHERE username="${username}"`
                                );
                                res.json({
                                    success: false,
                                    message: `Already ${role}`,
                                });
                            } else {
                                connection.query(
                                    `UPDATE ${SQL.tables.users} SET role_id="${data[0].id}" WHERE username="${username}"`,
                                    (error) => {
                                        if (error) {
                                            connection.query(
                                                `UPDATE ${SQL.tables.requestNewRole} SET status="fail" WHERE username="${username}"`
                                            );
                                        } else {
                                            connection.query(
                                                `UPDATE ${SQL.tables.requestNewRole} SET status="success" WHERE username="${username}"`,
                                                (error) => {
                                                    if (error) {
                                                        res.json({
                                                            success: false,
                                                            message:
                                                                "Internal server error",
                                                        });
                                                    } else {
                                                        res.json({
                                                            success: true,
                                                            message: `Congratulation!!, now you are ${roles.role}`,
                                                        });
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                } else {
                    connection.query(
                        `UPDATE ${SQL.tables.requestNewRole} SET status="fail" WHERE username="${username}"`
                    );
                    res.json({
                        success: false,
                        message: "Admin can not become influencer or user",
                    });
                }
            }
        );
    } else {
        connection.query(
            `UPDATE ${SQL.tables.requestNewRole} SET status="fail" WHERE username="${username}"`
        );
        res.json({
            success: false,
            message:
                "You can not become admin or this account doesn't have admin privileges",
        });
    }
};

exports.deleteChangeRoleRequest = (req, res) => {
    connection.query(
        `DELETE FROM ${SQL.tables.requestNewRole} WHERE id=${req.params.id}`,
        (error) => {
            if (error) {
                res.json({
                    success: false,
                    message: "Internal server error",
                });
            } else {
                res.json({
                    success: true,
                    message: "Deleted successfully",
                });
            }
        }
    );
};
