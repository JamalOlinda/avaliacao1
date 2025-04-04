const canvas = document.getElementById('jogocanvas')
const ctx = canvas.getContext ('2d')

const teclaspressionadas = {
    KeyA: false,
    KeyD:  false
};
document.addEventListener('keydown', (e) => {
        if(teclaspressionadas.hasOwnProperty(e.code)){
            teclaspressionadas[e.code] = true;
        }
    })
    document.addEventListener('keyup', (e) => {
        if(teclaspressionadas.hasOwnProperty(e.code)){
            teclaspressionadas[e.code] = false;
        }
    })

class Entidade {
    constructor (x, y, largura, altura, cor){
        this.x = x,
        this.y = y,
        this.largura = largura,
        this.altura = altura,
        this.cor = cor
    }
    desenhar () {
        ctx.fillStyle = this.cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}

    class Raqueteinsana extends Entidade {
        constructor (x, y, largura, altura, cor){
            super(x, y, largura, altura, cor);
        }
        atualizar() {
            if (teclaspressionadas.KeyA) {
                this.x -= 5;
            }
            if (teclaspressionadas.KeyD) {
                this.x += 5;
            }
            if (this.x < 0) {
                this.x = 0;
            }
            if (this.x + this.largura > canvas.width){
                this.x = canvas.width - this.largura
            }
        }
    }

    class Bolarebimbante {
        constructor(x, y, raio, cor, dx, dy){
            this.x = x
            this.y = y
            this.raio = raio
            this.cor = cor
            this.dx = dx
            this.dy = dy
            this.viva = true
        }
        desenhar() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2)
            ctx.fillStyle = this.cor
            ctx.fill();
            ctx.closePath();
        }
        atualizar (raqueteinsana, blocos){
            if (!this.viva) return;
            this.x += this.dx;
            this.y += this.dy;

            if (this.x + this.raio > canvas.width || this.x - this.raio < 0){
                this.dx *= -1;
            }
            if (this.y - this.raio < 0){
                this.dy *= -1;
            }
            if (this.y + this.raio > raqueteinsana.y && this.x > raqueteinsana.x && this.x < raqueteinsana.x + raqueteinsana.largura) {
                this.dy *= -1;
                this.y = raqueteinsana.y - this.raio
            }

        }
    }

const raqueteinsana = new Raqueteinsana (canvas.width / 2 - 50, canvas.height - 30, 100, 20, 'red')
const bola = new Bolarebimbante (canvas.width / 2, canvas.height / 2, 8, 'white', 4, -4)
console.log ("raquete criada", raqueteinsana)
function loop () {
    ctx.clearRect (0,0,canvas.width, canvas.height)
    raqueteinsana.desenhar();
    raqueteinsana.atualizar();
    bola.desenhar();
    bola.atualizar(raqueteinsana);

    requestAnimationFrame(loop)
}
loop()