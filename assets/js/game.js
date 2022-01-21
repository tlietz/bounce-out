import Matter from "matter-js";

const BORDER_W = 60;
const SCREEN_W = 800;
const SCREEN_H = 600;

const PIECE_R = 30;

// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composite = Matter.Composite,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Bodies = Matter.Bodies;

export function startGame() {
    // create an engine with no gravity
    var engine = Engine.create(),
        world = engine.world;
    engine.gravity.y = 0;

    // create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: SCREEN_W,
            height: SCREEN_H,
        },
    });

    // run the renderer
    Render.run(render);

    // create runner
    var runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    // add all of the bodies to the world
    const bodies = createBodies();
    Composite.add(world, [...bodies]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
        });
    Composite.add(world, mouseConstraint);
}

const createBodies = function () {
    const pieces = [createPiece(400, 200), createPiece(450, 90)];

    const border = [
        // bottom
        Bodies.rectangle(
            SCREEN_W / 2,
            SCREEN_H,
            SCREEN_W,
            BORDER_W,
            {
                isStatic: true,
            },
        ),
        // top
        Bodies.rectangle(SCREEN_W / 2, 0, SCREEN_W, BORDER_W, {
            isStatic: true,
        }),
        // left
        Bodies.rectangle(0, SCREEN_H / 2, BORDER_W, SCREEN_H, {
            isStatic: true,
        }),
        // right
        Bodies.rectangle(
            SCREEN_W,
            SCREEN_H / 2,
            BORDER_W,
            SCREEN_H,
            {
                isStatic: true,
            },
        ),
    ];

    return [...pieces, ...border];
};

const createPiece = function (x, y) {
    return Bodies.circle(x, y, PIECE_R, {
        restitution: 1,
        friction: 0,
        frictionAir: 0.03,
        frictionStatic: 0,
    });
};
