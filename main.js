class Base{
    constructor(nombre,minutos){
        this.nombre = nombre;
        this.minutos = minutos;
        this.siguiente = null;
        this.anterior = null;
    }
}
class ListaCircular{
    constructor(){
        this.primero = null;
    }
    agregar(nuevo){
        if(this.primero === null){
            this.primero = nuevo;
            this.primero.siguiente= this.primero;
            this.primero.anterior= this.primero;
        }
        else{
            nuevo.siguiente = this.primero;
            nuevo.anterior= this.primero.anterior;
            this.primero.anterior.siguiente= nuevo;
            this.primero.anterior= nuevo;
        }
    }
    buscar(objetivo){
        let aux= this.primero;
        while(aux){
            if(aux.nombre==objetivo){
                return aux;
            }
            aux=aux.siguiente;
            if(aux.siguiente==this.primero.siguiente){
                return null;
            }
        }
    }
    eliminar(objetivo){
        let res = this.buscar(objetivo);
        if(res==null){
            return null;
        }
        res.siguiente.anterior = res.anterior;
        res.anterior.siguiente = res.siguiente;
        return res
    }
    imprimir(){
        let aux  = this.primero;
        let lista = "";
        while(aux){
            lista += `${aux.nombre} - ${aux.minutos} Minutos\n`;
            aux=aux.siguiente;
            if(aux.siguiente==this.primero.siguiente){
                break;
            }
        }
        return lista;
    }
    recorrido(baseI,horaI,minutosI,horaF,minutosF){
        let lista="";
        let res = this.buscar(baseI)
        if(res==null){
            return "La base de inicio no existe";
        }
        let aux = res
        let inicio=(horaI*60)+minutosI
        let fin = (horaF*60)+minutosF

        while(inicio<=fin){
            lista += `${aux.nombre} - Hora ${horaI}:${minutosI}\n`
            aux=aux.siguiente;
            minutosI+=aux.minutos;
            inicio+=aux.minutos;
            if(minutosI>=60){
                horaI++;
                minutosI-=60;
            }
        }
        return lista;
    }
}
let miRuta = new ListaCircular();
let b = new Base("Base 1",59);
miRuta.agregar(b);
b = new Base("Base 2",29);
miRuta.agregar(b);
b = new Base("Base 3",59);
miRuta.agregar(b);
b = new Base("Base 4",20);
miRuta.agregar(b);
b = new Base("Base 5",20);
miRuta.agregar(b);
b = new Base("Base 6",30);
miRuta.agregar(b);

console.log(miRuta.buscar("Base 6"));
miRuta.eliminar("Base 6")
console.log(miRuta.imprimir());
console.log(miRuta.recorrido("Base 3",1,2,5,50));
b = new Base("Base 7",15);
miRuta.agregar(b);
console.log(miRuta.imprimir());
