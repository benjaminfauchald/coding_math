/**
 * @fileoverview misc - Low performance library for matrix and vector operations
 * @author Benjamin Fauchald
 * @author Friend, Imaginary 
 * @version 0.0.1
 */

/* Copyright (c) 2018, Fauchald Benjamin, Friend Imaginary */

console.log('yredsy');

function generateSquare(radius, origin, vertices, mesh) {
    var radius = 3;
    var origin = {
        x: 0,
        y: 0,
        z: 0
    };
    var point = {
        x: 0,
        y: 0,
        z: 0
    };

    var p1 = point;
    var p2 = point;
    var p3 = point;
    var p4 = point;

    x = origin.x;
    y = origin.y;
    z = origin.z;

    p1.x = x - radius;
    p1.y = y + radius;

    p2.x = x + radius;
    p2.y = y - radius;

    p3.x = x + radius;
    p3.y = y + radius;

    p4.x = x - radius;
    p4.y = y + radius;

    vertices.push(p1.x, p1.y, z);
    vertices.push(p2.x, p2.y, z);
    vertices.push(p3.x, p3.y, z);
    vertices.push(p4.x, p4.y, z);

};