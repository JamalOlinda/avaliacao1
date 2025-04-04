const canvas = document.getElementById('jogocanvas')
const ctx = canvas.getContext ('2d')

const teclaspressionadas = {
    KeyA: false,
    KeyD:  false
};
document.addEventListener('keydown', (e) => {
    for (let tecla in teclaspressionadas) {
        if(teclaspressionadas.hasOwnProperty(e.code)){
            teclaspressionadas[tecla] = true;
        }
    }
    if (teclaspressionadas.hasOwnProperty(e.code)) {
        teclaspressionadas[e.code] = false;
    }
});

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

const raqueteinsana = new Raqueteinsana (canvas.width / 2 - 50, canvas.height, 100, 20, 'red')
console.log ("raquete criada", raqueteinsana)
function loop () {
    ctx.clearRect (0,0,canvas.width, canvas.height)
    raqueteinsana.desenhar()
    raqueteinsana.atualizar()

    requestAnimationFrame(loop)
}