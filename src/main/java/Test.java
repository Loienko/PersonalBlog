public class Test {
    public static void main(String[] args) {
        String s1 = "abc";
        String s2 = s1;

        String s3 = s1;
        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);
        s1 = s1.substring(0, 1);
        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);
        s2 = s1.replace('a', '1');
        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);
        s1 = "123";
        System.out.println("s1: " + s1);
        System.out.println("s2: " + s2);
        System.out.println("s3: " + s3);

        /*Sub s = new Sub();
        System.out.println(s.name);
        System.out.println(s.getName());
        Base b = s;
        System.out.println(b.name);
        System.out.println(b.getName());*/
    }
}

class Base {
    public String name = "Base";

    public String getName() {
        return name;
    }
}

class Sub extends Base {
    public String name = "Sub";

    public String getName() {
        return name;
    }
}

